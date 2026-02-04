import { Component, computed, inject, signal } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-task-list',
  imports: [RouterLink],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  taskService = inject(TaskService);
  filter = signal<'all' | 'active' | 'completed'>('all');
  filterdTasks = computed(() => {
    switch (this.filter()) {
      case 'all':
        return this.taskService.tasks();
      case 'active':
        return this.taskService.activeTasks();
      case 'completed':
        return this.taskService.completedTasks();

      default:
        return this.taskService.tasks();
    }
  })
  setFilter(filter: 'all' | 'completed' | 'active') {
    this.filter.set(filter);
  }
  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }
}
