import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { TimerModule } from '../components/timer/timer.module';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AppProviders } from './app.providers';


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    TimerModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: AppProviders.getProviders()
})
export class AppModule {}
