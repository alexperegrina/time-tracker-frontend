import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { TaskPageComponent } from './task/task-page/task-page.component';
import { TaskDetailComponent } from './task/task-detail/task-detail.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    {
        path: 'task',
        canActivate: [authGuard],
        children: [
            { path: 'list', component: TaskPageComponent },
            { path: 'detail/:id', component: TaskDetailComponent }
        ]
    }
];