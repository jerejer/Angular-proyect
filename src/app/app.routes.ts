import { Routes } from '@angular/router';
import { AdminLayoutComponent } from "./admin/layout/admin-layout/admin-layout.component";
import { ListUserComponent } from "./admin/components/user/list-user/list-user.component";
import { CreateUserComponent } from "./admin/components/user/create-user/create-user.component";
 
import { EditUserComponent } from './admin/components/user/edit-user/edit-user.component';

export const routes: Routes = [
    
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            { path: 'user', children: [
                { path: 'list', component: ListUserComponent },
                { path: 'create', component: CreateUserComponent },
                { path: 'edit/:id', component: EditUserComponent }]
            }
            
        ]
    },
    { path: '**', redirectTo: 'admin/user/list' }
];
