import { Component , ViewChild } from '@angular/core';
import {ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';
import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";

import { Geolocation } from '@ionic-native/geolocation';
import { UserService } from '../../app/services/user.service';
import { AvatarService } from '../../app/services/avatar.service';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';


/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Injectable()

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
	@ViewChild('map') mapElement;
	user: any;
	map: GoogleMap;
	userService: any;
	avatar_breed: any;
	avatar_level: any;

	/*circle progress vars*/
	current: number = 0;
	max: number = 100;
	stroke: number = 15;
	radius: number = 125;
	semicircle: boolean = false;
	rounded: boolean = false;
	responsive: boolean = false;
	clockwise: boolean = true;
	color: string = '#45ccce';
	background: string = '#eaeaea';
	duration: number = 800;
	animation: string = 'easeOutCubic';
	animationDelay: number = 0;
	animations: string[] = [];
	gradient: boolean = false;
	realCurrent: number = 0;

  	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public localStorage: Storage,
		userService: UserService,
		public avatarService: AvatarService,
		public geolocation: Geolocation,
		public modalCtrl: ModalController
		){

			this.localStorage.get('user').then(user => {
				this.user = user;
				console.log(user);

			});

			this.userService = userService;

		
	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad MapPage');
    	this.startMap();
    	this.loadAvatarInfo();
    	
  	}

  	/*
  	* Loads Avatar info
  	*
  	*/

  	loadAvatarInfo(){
  		let param = {
			id: this.user.id,
			get_type: 'av_user_id' 
		};

		this.avatarService.getAvatar(param).then( 
			
			
			res => {
				var total = (res.level.points / res.level.level_req)*100;
				if(total > 100){
					total = 100;
				}

				this.current = total;
				this.avatar_breed = res.breed.name;
				this.avatar_level = res.avatar.av_level_id; 
				

		});
  	}

  	/*
  	* Gets all shelters around user
  	*
  	*/

  	loadSurroundings(){
  		let load = {
			id: this.user.id,
			lat: parseFloat(this.user.lat) + this.getRandomNumber(-5, 5) / 1000,
			lng: parseFloat(this.user.lng) + this.getRandomNumber(-5, 5) / 1000,
		};

		this.userService.getSurroundings(load).then( 

			res => {
			
			if(res.status){
				for(let key in res.stuff){
			
					let guardian = res.stuff[key];
			
					let guardian_pos = new google.maps.LatLng(parseFloat(guardian.lat), parseFloat(guardian.lng));

					let icon = {
						url: guardian.icon.url == undefined ? "assets/imgs/map/pin_sb.svg" : guardian.icon.url,
						scaledSize: new google.maps.Size(70, 70),
					};

					let markerType = "guardian";

					let markerData = {
						id: markerType + guardian.id,
						position: guardian_pos,
						map: this.map,
						title: guardian.first_name,
						icon: icon,
						user: guardian,
						missions: [],
						missionsCount: 0,
						shelter: null
					};

					let marker = new google.maps.Marker(markerData);

					marker.addListener('click', () => {
						this.getMarkerClick(marker);
					});
				}
			}else{
				console.log("miss");
			}

		});
  	}

  	getMarkerClick(marker){
  		let profileModal = this.modalCtrl.create('MissionModalPage', { userId: 8675309 });
   		profileModal.present();
  	}

  	/*
  	* Starts map based on user's curr location and surroundings
  	*
  	*/
  	startMap() {
		
		//get user curr pos
		this.geolocation.getCurrentPosition().then((position) => {
			//pass user curr pos to google maps SDK
			let curr_pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			
			//create instance of map
			let mapEle = this.mapElement.nativeElement;

			//load map
			this.map = new google.maps.Map(mapEle, {
				zoom: 16,
				center: curr_pos
			});

			//add marker
			new google.maps.Marker({
				position: curr_pos,
				map: this.map,
				title: this.user.first_name,
				user: this.user
			});

			this.loadSurroundings();

		},(err) => {
			console.log(err);
		});
    	
    	
  	
	}

	getRandomNumber(min, max) {
		return Math.random() * (max - min) + min;
	}



}
