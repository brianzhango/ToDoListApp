import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, finalize } from 'rxjs';


export interface TodoItem {
  id: string;
  itemName: string;
  createdDateTime: string;
}


@Injectable({ providedIn: 'root' })
export class TodoService {
  private base = 'http://localhost:5097';


  constructor(private http: HttpClient) {}


  getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(`${this.base}/todos`);
  }

  addTodo(itemName: string) : Observable<TodoItem> {
    const payload = {
      itemName: itemName,
    };
    console.log('Sending payload:', payload);

    return this.http.post<TodoItem>(`${this.base}/todos`, payload).pipe(
      tap(response => console.log('Received response:', response)),
      catchError(error => {
        console.error('Error adding todo:', error);
        throw error;
      })
    );
  }

  deleteTodo(id: string) {
    return this.http.delete(`${this.base}/todos/${id}`);
  }
  
}