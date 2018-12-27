import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {ShelterService} from '../../app/services/shelter.service';
import {ShelterReviewPage} from "./shelter-review/shelter-review";

/**
 * Generated class for the ShelterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shelter',
  templateUrl: 'shelter.html',
})
export class ShelterPage {
	
  	user: any;
	shelter: any;
	reviews: Array<any> = [];
	

  	constructor(
  		public navCtrl: NavController,
  		public navParams: NavParams,
  		public localStorage: Storage,
  		public modalCtrl: ModalController,
  		public shelterService: ShelterService
  		) {

  		this.localStorage.get('user').then(user => {
			this.user = user;
			
		});

  		
  		this.getShelterDetails();
  		this.getShelterReviews();
  		
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad ShelterPage');
    	
  	}

  	onUpdated(test : boolean){
  		console.log(test);
  	}

  	//get reviews and comments. passes a shelter_id to service
    getShelterReviews(){
    	console.log("entered reviews");
		let param = { shelter_id: this.navParams.data.shelter_id};

		this.shelterService.getReviews(param).then( 
			
				
			res => {
				console.log(res);
				Object.keys(res).forEach((key, index) => {
						this.reviews.push(res[key]);
				});
				
		}).catch((error) => {
				console.log(error);
		});
    }

    //get shelter details for header etc
  	getShelterDetails() {
		
		let param = { shelter_id: this.navParams.data.shelter_id};

		this.shelterService.getShelter(param).then( 
			
			
			res => {
			
				this.shelter = res;
				console.log(this.shelter);
		}).catch((error) => {
				console.log(error);
		});
		
	}

	//loads modal that allows user to review shelter
	showReviewModal() {
		let reviewPageParams = {
			shelter_id: this.shelter.shelter_id,
			user_id: this.user.id,
		};

		let modal = this.modalCtrl.create(ShelterReviewPage, reviewPageParams);

		modal.onDidDismiss(data => {
			this.updateReview(data);
		});

		modal.present({animate: false});
	}

	updateReview(data){
		if(data.updated){
			this.reviews = [];
			this.getShelterReviews();
		}
	}


	
	



}
