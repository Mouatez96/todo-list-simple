import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TodoServiceService} from "./services/todo-service.service";

export interface Todo {
  task: string;
  type: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = ['task', 'type', 'action'];
  dataSource !: MatTableDataSource<Todo>;
  todoForm !: FormGroup;

  constructor(private _fb: FormBuilder,
              private _service: TodoServiceService) {}

  ngOnInit(): void {
    this.initForm();
    this.getTodoList();
  }

  initForm() {
    this.todoForm = this._fb.group({
      task: '',
      type: ''
    })
  }

  onFormSubmit() {
    this._service.addTodo(this.todoForm.value).subscribe({
      next: (value:any) => {
        console.log("Task added successfully");
        this.getTodoList()
      },
      error: console.log
    })
  }

  getTodoList() {
    this._service.getTodoList().subscribe({
      next: (value: any) => {
        this.dataSource = new MatTableDataSource<Todo>(value);
      },
      error: console.log
    })
  }

  deleteTask(id: number) {
    this._service.deleteTodo(id).subscribe({
      next: (value) => {
        console.log("Task deleted successfully");
        this.getTodoList();
      },
      error: console.log
    })
  }

}
