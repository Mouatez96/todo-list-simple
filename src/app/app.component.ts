import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TodoServiceService} from "./services/todo-service/todo-service.service";
import {CoreService} from "./services/core/core.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDeleteComponent} from "./components/confirm-delete/confirm-delete.component";

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
              private _service: TodoServiceService,
              private _coreService: CoreService,
              private _dialog: MatDialog) {}

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
        this._coreService.openSnackBar("Task added successfully", "done");
        this.getTodoList()
        this.initForm()
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

  openDeleteDialog(data:any) {
    const dialogRef = this._dialog.open(ConfirmDeleteComponent, {data});
    dialogRef.afterClosed().subscribe({
      next : value =>  {
        this.getTodoList()
      }
    })
  }

}
