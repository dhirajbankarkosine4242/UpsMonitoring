import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './side-menu/alerts/alerts.component';
import { ProfileComponent } from './profile/profile.component';
import { AssetsComponent } from './side-menu/assets/assets.component';
import { PracticeComponent } from './side-menu/practice/practice.component';
import { ViewComponent } from './side-menu/assets/view/view.component';
import { AnalyticsComponent } from './side-menu/assets/analytics/analytics.component';
import { HistoryComponent } from './side-menu/assets/history/history.component';

const routes: Routes = [
  {
    path: 'assets',
    component: AssetsComponent
  },
  {
    path: 'alerts',
    component: AlertsComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'practice',
    component: PracticeComponent
  },
  {
    path: 'view',
    component: ViewComponent
  },
  {
    path: 'analytics',
    component: AnalyticsComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
