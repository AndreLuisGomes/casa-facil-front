import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
},
{
    path: 'auth',
    loadComponent:
        () => import('./layouts/auth-layout/default-auth-layout/default-auth-layout.component')
            .then(m => m.DefaultAuthLayoutComponent),
    children:[{
        path: 'login',
        loadComponent:() => import('./layouts/auth-layout/default-auth-layout/login/login.component').then(m => m.LoginComponent)
    },{
        path: 'register',
        loadComponent:() => import('./layouts/auth-layout/default-auth-layout/register/register.component').then(m => m.RegisterComponent)
    }]
},
{
    path: '**',
    pathMatch: 'full',
    redirectTo: '/auth'
}
];
