import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MissionModalPage } from './mission-modal';

@NgModule({
  declarations: [
    MissionModalPage,
  ],
  imports: [
    IonicPageModule.forChild(MissionModalPage),
  ],
})
export class MissionModalPageModule {}
