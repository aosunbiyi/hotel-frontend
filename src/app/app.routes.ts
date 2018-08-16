
import { Routes, RouterModule } from '@angular/router';
import { MainDashboardComponent } from './Components/main-dashboard/main-dashboard.component';
import { GuestProfileComponent } from './Components/guest-profile/guest-profile.component';

const routes: Routes = [
    {
        path: '',
        component: MainDashboardComponent
    },
    {
        path: 'guest-profile',
        component: GuestProfileComponent
    }
];

export const AppRoutes = RouterModule.forRoot(routes);
