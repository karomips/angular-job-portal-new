import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

export interface Task {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  constructor() { }

  addTask(task: string): void {
    let addTask:Task = { name: task, createdAt: new Date(), updatedAt: new Date(), id: this.tasks.value.length + 1 }
    this.tasks.next([...this.tasks.value,addTask]);
  }

  getTasks() {
    return this.tasks.asObservable()
  }

  getTaskById(taskId:number) {
    return this.tasks.value.find((task) => task.id === taskId)
  }
}
