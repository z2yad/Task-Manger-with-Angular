import { Routes } from '@angular/router';
import { TaskList } from './components/task-list/task-list';
import { TaskForm } from './components/task-form/task-form';
import { TaskDetails } from './components/task-details/task-details';

export const routes: Routes = [
    {
        path: '',
        component: TaskList
    }
    , {
        path: 'add-task',
        component: TaskForm
    }
    , {
        path: 'task/:id',
        component: TaskDetails
    }
];
