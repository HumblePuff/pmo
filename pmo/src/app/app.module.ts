import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TimerDisplayPipe } from './pipes/timer-display/timer-display.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    TimerDisplayPipe,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
