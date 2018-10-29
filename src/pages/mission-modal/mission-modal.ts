import { Component } from '@angular/core';
import {Injectable} from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController} from 'ionic-angular';
import {MissionService} from '../../app/services/mission.service';

/**
 * Generated class for the MissionModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Injectable()
@Component({
  selector: 'page-mission-modal',
  templateUrl: 'mission-modal.html',
})
export class MissionModalPage {
  missions: any;
  shelter: any;
  test:any;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams , public missionService: MissionService) {
      
      
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad MissionModalPage');
      this.getMissions();

    }

    getMissions(){
      this.missionService.getShelterMissions(1).then( 

      res => {

        this.missions = [];
        for(let key in res.missions){
          
          this.missions.push(res.missions[key]);
        }
        this.shelter = res.shelter;
        console.log(this.missions);

      
      });
    }

    dismiss() {
      this.viewCtrl.dismiss({}, '', {animate: false});
    }

    public openMission(idMission) {
      this.navCtrl.push('MissionPage', {
        mission_id: idMission
      });
    }

    public openShelter(shelter_id) {
      this.navCtrl.push('ShelterPage', {
        shelter_id: shelter_id
    });
  }

}
