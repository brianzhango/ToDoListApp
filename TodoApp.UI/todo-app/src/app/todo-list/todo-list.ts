import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TodoService, TodoItem } from '../services/todo';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { AddTodo } from '../add-todo/add-todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.html',
  styleUrls: ['./todo-list.scss'],
  imports: [CommonModule, FormsModule, AddTodo],
  changeDetection: ChangeDetectionStrategy.Default
})

export class TodoList implements OnInit{
  todos: TodoItem[] = [];
  loading = false;
  constructor(
  private todoService: TodoService,
  private cdr: ChangeDetectorRef
  ) {}
 


  ngOnInit() {
    this.load();
  }


  load() {
    this.loading = true;

    this.todoService.getTodos().subscribe({
      next: (t) => { 
        this.todos = t; 
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        this.loading = false;
        this.cdr.markForCheck();
        alert('Failed to load todos. Please check console for details.');
      },
      complete: () => {
      console.log('GetTodos request completed');
      this.loading = false;
    }
    });
  }

  delete(id: string) {
   this.todoService.deleteTodo(id).subscribe(() => this.load());
  }

}
