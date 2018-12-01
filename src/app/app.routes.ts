

import { Routes, RouterModule } from '@angular/router';
import { MainDashboardComponent } from './Components/main-dashboard/main-dashboard.component';
import { GuestProfileComponent } from './Components/guest-profile/guest-profile.component';
import { HotelWalkinComponent } from './Components/hotel-walkin/hotel-walkin.component';
import { RoomLookUpComponent } from './Components/room-manager/room-look-up/room-look-up.component';

const routes: Routes = [
    {
        path: '',
        component: MainDashboardComponent
    },
    {
        path: 'guest-profile',
        component: GuestProfileComponent
    },
    {
        path: 'hotel-walkin',
        component: HotelWalkinComponent
    },
    {
        path: 'room-lookup',
        component: RoomLookUpComponent
    },
    {
        path: 'front-office',
        loadChildren: './Components/front-office/front-office.module#FrontOfficeModule'
    },
    {
        path: '**',
        redirectTo: 'main'
    }
];

export const AppRoutes = RouterModule.forRoot(routes);
