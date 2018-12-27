import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyMissionsPage } from './my-missions';

@NgModule({
  declarations: [
    MyMissionsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyMissionsPage),
  ],
})
export class MyMissionsPageModule {}
