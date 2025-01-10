import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HighlightDirective } from '../highlight.directive';
import { ActivatedRoute } from '@angular/router';
import { Task, TaskService } from '../task.service';

@Component({
  selector: 'app-view-detail',
  imports: [CommonModule,HighlightDirective],
  templateUrl: './view-detail.component.html',
  styleUrl: './view-detail.component.css',
  providers: []
})
export class ViewDetailComponent implements OnInit {
  task!: Task;
  private taskId!: number|string
  customStyleClass = 'highlight'
  constructor(private http: HttpClient,private route: ActivatedRoute,private taskService: TaskService) {

  }
  ngOnInit(): void {
    this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe(data => {
      console.log(data);
    })
    this.route.params.subscribe(params => {
      this.taskId = params['id']
      this.task = this.taskService.getTaskById(+this.taskId)as Task
    })
  }
}
