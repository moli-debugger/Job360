import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyCorePageComponent } from './modules/company/company-core-page/company-core-page.component';
import { CompanyHomepageComponent } from './modules/company/company-homepage/company-homepage.component';
import { JobPostPageComponent } from './modules/company/job-post-page/job-post-page.component';
import { AuthGuard } from './shared';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/admin/layout.module').then((m) => m.LayoutModule),
        canActivate: [AuthGuard]
    },
    { path: 'login', loadChildren: () => import('./login/login.module').then((m) => m.LoginModule) },
    { path: 'signup', loadChildren: () => import('./signup/signup.module').then((m) => m.SignupModule) },
    {
        path: 'error',
        loadChildren: () => import('./server-error/server-error.module').then((m) => m.ServerErrorModule)
    },
    {
        path: 'access-denied',
        loadChildren: () => import('./access-denied/access-denied.module').then((m) => m.AccessDeniedModule)
    },
    { 
        path:'company',
        component:CompanyCorePageComponent,
        children:[{
            path:'',
            component:CompanyHomepageComponent
        },
        {
            path:'jobPost',
            component:JobPostPageComponent
        }]
    },
    { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then((m) => m.NotFoundModule) },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
