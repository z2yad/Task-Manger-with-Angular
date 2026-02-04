import { computed, Injectable, signal } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksignal = signal<Task[]>([
    {
      id: 1,
      title: 'learn vanila js',
      description: 'understand the fundemental of vanila js and build a simple project',
      completed: true,
      createdAt: new Date('2025-01-14')
    },
    {
      id: 2,
      title: 'learn angular',
      description: 'understand the fundemental of angular and build a simple project',
      completed: false,
      createdAt: new Date('2025-09-14')
    },
  ]);
  tasks = this.tasksignal.asReadonly();
  completedTasks = computed(() => {
    return this.tasksignal().filter((task) => task.completed);
  });

  activeTasks = computed(() => {
    return this.tasksignal().filter((task) => !task.completed);
  });

  getTask(id: number) {
    return this.tasks().find((task) => task.id === id);
  }
  deleteTask(id: number) {
    return this.tasksignal.update((tasks) => tasks.filter((task) => task.id !== id))
  }
  addTask(title: string, description: string) {
    const task: Task = {
      id: this.tasks().length + 1,
      title,
      description,
      completed: false,
      createdAt: new Date(),
    }
    // Update the signal with the new task
    this.tasksignal.update((tasks) => [...tasks, task]);
  }
}
