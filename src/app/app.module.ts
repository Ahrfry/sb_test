import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {Ionic2RatingModule} from "ionic2-rating";
import {IonicStorageModule} from "@ionic/storage";
import { MyApp } from './app.component';


import { Geolocation } from '@ionic-native/geolocation';

import { HttpClientModule } from '@angular/common/http';

import { RestService } from './services/rest.service';
import { UserService } from './services/user.service';
import { MissionService } from './services/mission.service';
import { ShelterService } from './services/shelter.service';
import {ShelterReviewPage} from "../pages/shelter/shelter-review/shelter-review";

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { MapPageModule } from '../pages/map/map.module';
import { ShelterPage } from '../pages/shelter/shelter';
import { PrimaryTabsPageModule } from '../pages/primary-tabs/primary-tabs.module';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    
    ShelterReviewPage
  ],
  imports: [
    BrowserModule,
    MapPageModule,
    PrimaryTabsPageModule,
    HttpClientModule,
    Ionic2RatingModule,
    IonicStorageModule.forRoot({
      driverOrder: ['localstorage']
    }),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
   
    ShelterReviewPage
  ],
  providers: [
    Geolocation,
    StatusBar,
    SplashScreen,
    RestService,
    UserService,
    MissionService,
    ShelterService,
    ShelterPage,
   
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
