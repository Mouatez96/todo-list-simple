import {Component, Inject, OnInit} from '@angular/core';
import {TodoServiceService} from "../../services/todo-service/todo-service.service";
import {CoreService} from "../../services/core/core.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(private _service: TodoServiceService,
              private _coreService: CoreService,
              private _dialogRef: MatDialogRef<ConfirmDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

  deleteTask() {
    this._service.deleteTodo(this.data).subscribe({
      next: (value) => {
        this._coreService.openSnackBar("Task deleted successfully", "ok")
        this._dialogRef.close(true);
        localStorage.removeItem('checkbox_'+this.data);
      },
      error: console.log
    })
  }

}
