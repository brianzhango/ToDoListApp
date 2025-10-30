import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../services/todo';
@Component({
  selector: 'app-add-todo',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-todo.html',
  styleUrls: ['./add-todo.scss'],
})
export class AddTodo {
  itemName = '';
  @Output() added = new EventEmitter<void>();


  constructor(private todoService: TodoService) {}


  add() {
    if (!this.itemName.trim()) return;

    this.todoService.addTodo(this.itemName.trim()).subscribe((response) => {
      this.itemName = '';
      this.added.emit();
    });
  }
}
