import { Routes } from '@angular/router';
import { MainPageComponent } from '../main-page/main-page.component';
import { SigninComponent } from '../auth/signin/signin.component';
import { SignupComponent } from '../auth/signup/signup.component';

export const appRoutes: Routes = [
    { path: 'main-page', component: MainPageComponent },
    {
        path: 'signup', component: MainPageComponent,
        children: [{ path: '', component: SignupComponent }]
    },
    {
        path: 'signin', component: MainPageComponent,
        children: [{ path: '', component: SigninComponent }]
    },
    { path : '', redirectTo:'/signin', pathMatch : 'full'}
    
];