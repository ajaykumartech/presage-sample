import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { AssetsComponent } from './assets/assets.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    // ...
  AssetsComponent,
 
  
  ],
  imports: [
    // ...
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    AppComponent,
    DropdownComponent,
  ],
  bootstrap: [],
})

export class AppModule {}