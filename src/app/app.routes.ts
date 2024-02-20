import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AssetsComponent } from './assets/assets.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', component: AppComponent},
    { path: 'assets', component: AssetsComponent},
    { path: 'dropdown', component: DropdownComponent},
    { path: 'calendar', component: CalendarComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}