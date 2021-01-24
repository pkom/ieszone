import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Color } from '@iz/enum';

@Component({
  selector: 'iz-todo',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  todoForm: FormGroup;
  todoOptions = {
    primaryAction: { icon: 'check' },
    secondaryAction: { icon: 'clear', color: Color.ERROR },
    heroBg: 'transparent',
    reverse: true,
    mainBg: '#EEEEEE',
  };
  mapped = false;
  todoList = [
    {
      description: 'This is a Medium Task',
      color: Color.GENTLE,
    },
    {
      description: 'High Priority Task',
      color: Color.ERROR,
    },
    {
      description: 'Important Task',
      color: Color.WARN,
    },
  ];
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.todoList.map((item) => Object.assign(item, this.todoOptions));
    this.mapped = true;
    this.todoForm = this.fb.group({
      description: [''],
    });
  }

  primaryClick(e) {
    this.todoList.splice(e, 1);
  }
  secondaryClick(e) {
    this.todoList.splice(e, 1);
  }

  addTodo() {
    let todo = this.todoForm.value;
    if (this.todoForm.value.description) {
      todo.color = Color.GENTLE;
      todo = Object.assign(todo, this.todoOptions);
      this.todoList.push(todo);
      this.todoForm.reset();
    }
  }
}
