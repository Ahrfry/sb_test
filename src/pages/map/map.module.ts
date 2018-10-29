import { NgModule } from '@angular/core';
import {Injectable} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { MapPage } from './map';



@NgModule({
  declarations: [
    MapPage,
  ],
  imports: [
    IonicPageModule.forChild(MapPage),
  ],
})
export class MapPageModule {
	

	
}
