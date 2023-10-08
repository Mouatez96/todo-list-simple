import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Todo} from "../../app.component";

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  constructor(private _http: HttpClient) { }

  apiUrl: string = "http://localhost:3000/todo";
  getTodoList() {
    return this._http.get(this.apiUrl);
  }
  addTodo(todo: Todo) {
    return this._http.post(this.apiUrl, todo)
  }
  deleteTodo(id: number) {
    return this._http.delete(this.apiUrl+`/${id}`)
  }
}
