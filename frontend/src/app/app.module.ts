import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PartialsComponent } from './components/partials/partials.component';
import { HeaderComponent } from './components/partials/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    PartialsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
