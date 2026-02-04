import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task-service';

@Component({
  selector: 'app-task-details',
  imports: [RouterLink],
  templateUrl: './task-details.html',
  styleUrl: './task-details.css',
})
export class TaskDetails {
  route = inject(ActivatedRoute);
  taskId = signal<number | null>(null)
  private taskService = inject(TaskService);
  private router = inject(Router);
  task = computed(() => {
    const id = this.taskId();
    if (!id) return undefined;
    return this.taskService.getTask(id);
  })

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taskId.set(Number(id));
    }
  }
  deleteTask(id: number) {
    this.taskService.deleteTask(id);
    this.router.navigate(['/']);
  }
}
