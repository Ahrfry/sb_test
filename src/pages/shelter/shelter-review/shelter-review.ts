import {Component, EventEmitter , Injectable, Output} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {ShelterService} from '../../../app/services/shelter.service';

@IonicPage()
@Component({
	
	selector: 'page-shelter-review',
	templateUrl: 'shelter-review.html',
})
export class ShelterReviewPage {

	rating: any;
	review: any;
	user: any;
	updated: boolean;
	@Output() updated = new EventEmitter<boolean>();
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public localStorage: Storage,
		public shelterService: ShelterService,
		
		
		
		) {

		this.updated = false;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ShelterReviewPage');
	}

	dismiss() {
		this.viewCtrl.dismiss({updated: this.updated}, '', {animate: false});
		
		
	}

	setRating() {
		if (this.review !== '' && this.review !== null && this.rating !== '' && this.rating !== null) {
			let param = {
				shelter_id: this.navParams.data.shelter_id,
				user_id: this.navParams.data.user_id,
				rating: this.rating.toString(),
				review: this.review
			};

			this.shelterService.setRating(param).then( 
			
			
			res => {
				this.updated = true;
				this.dismiss();
				
			}).catch((error) => {
				console.log(error);
			});
		}
	}

	

}
