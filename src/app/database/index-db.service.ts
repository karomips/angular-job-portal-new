import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IndexDbService {
  private dbName = 'myEmployeeDatabase';
  private storeName = 'employees';

  constructor() {}

  // Open IndexedDB and handle version upgrades
  private openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;

        // Create an object store for employees if not already present
        if (!db.objectStoreNames.contains(this.storeName)) {
          const objectStore = db.createObjectStore(this.storeName, { keyPath: 'email', autoIncrement: false });
          objectStore.createIndex('email', 'email', { unique: true });
          objectStore.createIndex('id', 'id', { unique: true });
          objectStore.createIndex('isManager', 'isManager', { unique: false });
        }
      };

      request.onsuccess = (event: any) => {
        resolve(event.target.result);
      };

      request.onerror = (event: any) => {
        reject(event.target.error);
      };
    });
  }

  // Generate a unique employee ID based on the first 3 chars of the name and a random number
  private generateEmployeeId(name: string): string {
    const randomNum = Math.floor(Math.random() * 10) + 1;
    return name.substring(0, 3).toUpperCase() + '0' + randomNum;
  }

  // Create Employee
  addEmployee(user: any): Observable<any> {
    return new Observable((observer) => {
      this.openDatabase().then((db) => {
        const transaction = db.transaction(this.storeName, 'readwrite');
        const objectStore = transaction.objectStore(this.storeName);

        // Check if the email already exists in the store
        const emailIndex = objectStore.index('email');
        const getRequest = emailIndex.get(user.email);

        getRequest.onsuccess = () => {
          if (getRequest.result) {
            observer.error({
              message: 'Email already exists in the database.',
            });
          } else {
            user.id = this.generateEmployeeId(user.name); // Generate unique ID

            const addRequest = objectStore.add(user);

            addRequest.onsuccess = () => {
              observer.next({
                message: 'Employee added successfully!',
                user,
              });
              observer.complete();
            };

            addRequest.onerror = (event: any) => {
              observer.error({
                message: 'Error adding employee',
                error: event.target.error,
              });
            };
          }
        };

        getRequest.onerror = (event:any) => {
          observer.error({
            message: 'Error querying the email index',
            error: event.target.error,
          });
        };
      }).catch((error) => {
        observer.error({
          message: 'Error opening database',
          error: error,
        });
      });
    }).pipe(timeout(1000));
  }

  // Read Employee by Email
  getEmployeeByEmail(email: string): Observable<any> {
    return new Observable((observer) => {
      this.openDatabase().then((db) => {
        const transaction = db.transaction(this.storeName, 'readonly');
        const objectStore = transaction.objectStore(this.storeName);

        const request = objectStore.get(email);

        request.onsuccess = (event: any) => {
          observer.next(event.target.result);
          observer.complete();
        };

        request.onerror = (event: any) => {
          observer.error({
            message: 'Error fetching employee by email',
            error: event.target.error,
          });
        };
      }).catch((error) => {
        observer.error({
          message: 'Error opening database',
          error: error,
        });
      });
    }).pipe(timeout(1000));
  }

  // Update Employee by Email
  updateEmployee(email: string, updatedData: any): Observable<any> {
    return new Observable((observer) => {
      this.openDatabase().then((db) => {
        const transaction = db.transaction(this.storeName, 'readwrite');
        const objectStore = transaction.objectStore(this.storeName);

        const getRequest = objectStore.get(email);

        getRequest.onsuccess = (event: any) => {
          const employee = event.target.result;
          if (employee) {
            Object.assign(employee, updatedData); // Merge updated data into existing employee
            const updateRequest = objectStore.put(employee);

            updateRequest.onsuccess = () => {
              observer.next({
                message: 'Employee updated successfully!',
                employee,
              });
              observer.complete();
            };

            updateRequest.onerror = (event: any) => {
              observer.error({
                message: 'Error updating employee',
                error: event.target.error,
              });
            };
          } else {
            observer.error({
              message: 'Employee not found',
            });
          }
        };

        getRequest.onerror = (event: any) => {
          observer.error({
            message: 'Error fetching employee by email',
            error: event.target.error,
          });
        };
      }).catch((error) => {
        observer.error({
          message: 'Error opening database',
          error: error,
        });
      });
    }).pipe(timeout(1000));
  }

  // Delete Employee by Email
  deleteEmployee(email: string): Observable<any> {
    return new Observable((observer) => {
      this.openDatabase().then((db) => {
        const transaction = db.transaction(this.storeName, 'readwrite');
        const objectStore = transaction.objectStore(this.storeName);

        const request = objectStore.delete(email);

        request.onsuccess = () => {
          observer.next({
            message: 'Employee deleted successfully!',
          });
          observer.complete();
        };

        request.onerror = (event: any) => {
          observer.error({
            message: 'Error deleting employee',
            error: event.target.error,
          });
        };
      }).catch((error) => {
        observer.error({
          message: 'Error opening database',
          error: error,
        });
      });
    }).pipe(timeout(1000));
  }

  // Get all employees
  getAllEmployees(): Observable<any[]> {
    return new Observable((observer) => {
      this.openDatabase().then((db) => {
        const transaction = db.transaction(this.storeName, 'readonly');
        const objectStore = transaction.objectStore(this.storeName);

        const request = objectStore.getAll();

        request.onsuccess = (event: any) => {
          observer.next(event.target.result);
          observer.complete();
        };

        request.onerror = (event: any) => {
          observer.error({
            message: 'Error fetching all employees',
            error: event.target.error,
          });
        };
      }).catch((error) => {
        observer.error({
          message: 'Error opening database',
          error: error,
        });
      });
    })
  }
}
