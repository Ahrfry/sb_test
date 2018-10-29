import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MissionCardPage } from './mission-card';

@NgModule({
  declarations: [
    MissionCardPage,
  ],
  imports: [
    IonicPageModule.forChild(MissionCardPage),
  ],
})
export class MissionCardPageModule {}
