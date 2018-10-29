import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';
import {Storage} from "@ionic/storage";

import { RestService } from './services/rest.service';
import { UserService } from './services/user.service';
import { MissionService } from './services/mission.service';
import { ShelterService } from './services/shelter.service';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { MapPage } from '../pages/map/map';
import { ShelterPage } from '../pages/shelter/shelter';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html' , 
  providers: [UserService , RestService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private localStorage: Storage
    
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage }
    ];
  }

  initializeApp() {

    this.treatRootPage();

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  /**
   * Determines which is the application's rootPage
   * If the user is already logged in, RootPage will be MapPage, if not LoginPage.
   */
  treatRootPage() {
    this.localStorage.get('user').then(user => {
      if (!user) {
        this.rootPage = HelloIonicPage;
        return false;
      }
      
      this.rootPage = MapPage;
    });
  }
}
