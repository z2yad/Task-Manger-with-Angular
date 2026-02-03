import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task-service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]]
  })
  private router = inject(Router);
  onsubmit() {
    if (this.taskForm.valid) {
      console.log('Form is valid')
      console.log(this.taskForm.value)
      const { title, description } = this.taskForm.value
      if (title && description) {
        this.taskService.addTask(title, description)
        this.taskForm.reset()
        this.router.navigate(['/'])
      }
    }
    else {
      console.log('Form is not valid')

    }
  }
}
