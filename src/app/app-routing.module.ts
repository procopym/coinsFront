import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {StatisticsComponent} from "./pages/statistics/statistics.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {SettingsComponent} from "./components/settings/settings.component";

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'stats',component:StatisticsComponent},
  {path:'settings',component:SettingsComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
