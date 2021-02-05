import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { LayoutComponent } from './layout/layout.component';
import {
  dashboardRoutes,
  travelRoutes,
  eventRoutes,
  activityRoutes,
  paymentRoutes,
  interactionRoutes,
  settingRoutes,
} from './path';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { Role } from '@iz/enum';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        data: { title: 'DashBoard', children: dashboardRoutes },
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'travel',
        data: { title: 'Travel and Tour', children: travelRoutes },
        loadChildren: () =>
          import('./travel/travel.module').then((m) => m.TravelModule),
      },
      {
        path: 'event',
        data: { title: 'Events', children: eventRoutes },
        loadChildren: () =>
          import('./event/event.module').then((m) => m.EventModule),
      },
      {
        path: 'activity',
        data: { title: 'Achievements & Activities', children: activityRoutes },
        loadChildren: () =>
          import('./activity/activity.module').then((m) => m.ActivityModule),
      },
      {
        path: 'payment',
        data: {
          title: 'Payments',
          children: paymentRoutes,
          expectedRoles: [Role.PARENT.valueOf()],
        },
        canLoad: [RoleGuard],
        loadChildren: () =>
          import('./payment/payment.module').then((m) => m.PaymentModule),
      },
      {
        path: 'interaction',
        data: { title: 'Interactions', children: interactionRoutes },
        loadChildren: () =>
          import('./interaction/interaction.module').then(
            (m) => m.InteractionModule,
          ),
      },
      {
        path: 'setting',
        data: { title: 'Settings', children: settingRoutes },
        loadChildren: () =>
          import('./setting/setting.module').then((m) => m.SettingModule),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
