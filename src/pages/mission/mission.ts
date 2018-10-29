import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';

import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";

import {MapPage} from "../map/map";
import {MissionService} from '../../app/services/mission.service';

/**
 * Generated class for the MissionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mission',
  templateUrl: 'mission.html',
})
export class MissionPage {
	user: any;
	mission: any;
	missionItems: any;
	completion: any;
	shelter: any;
	disabled: boolean=false;	

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public localStorage: Storage,
		public missionService: MissionService,
		public alertCtrl: AlertController
		) {
		
		this.localStorage.get('user').then(user => {
			this.user = user;
			this.loadMission();
		});
	}

	loadMission() {
		let param = {mission_id : this.navParams.data.mission_id , hero_id : this.user.id};
		
		this.missionService.getMission(param).then( 
			
			
			res => {
			
				this.mission = res.mission;
				this.missionItems = res.mission_items;
				this.completion = res.completion;
				this.disabled = res.completion.disabled;
				this.shelter = res.shelter;

		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MissionPage');
	}


	/**
	 * Method to accept a mission
	 *
	 * @param {string}    completionType    'item' or 'credit'
	 */
	acceptMission(completion_type) {

		let param = {mission_id : this.mission.id , hero_id : this.user.id , completion_type : completion_type};

		this.missionService.acceptMission(param).then( 
			
			
			res => {
				
				let title = res.status === true ? 'Mission accepted' : 'Error';
				this.showMissionAlert(title, res.message);
				

		}).catch((error) => {
			this.showMissionAlert('Error', 'Failed to accept mission, please try again later');
		});
	}

	/**
	 * Method for displaying an alert after mission accepting or failure while accepting.
	 *
	 * @param {string}    title        Alert title
	 * @param {string}    message        Alert message
	 */
	public showMissionAlert(title, message) {

		let alert = this.alertCtrl.create({
			title: title,
			subTitle: message,
			buttons:[{
				text : 'OK',
				role: "cancel",
				handler: () => {
					this.navCtrl.setRoot(MapPage);
				}
			}]
		});

		alert.present();
	}
}
