import { Component } from '@angular/core';
import {Injectable} from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from "ionic-angular";
import {Storage} from "@ionic/storage";
import {MapPage} from "../map/map";

import {UserService} from '../../app/services/user.service';


@Injectable()

@Component({
  	selector: 'page-hello-ionic',
  	templateUrl: 'hello-ionic.html'
})

export class HelloIonicPage {
	userService: any;
	params : any;
	username: string;
	password: string;

	constructor(
			public navCtrl: NavController,
			userService: UserService,
			public alertCtrl: AlertController,
			public localStorage: Storage){

		this.userService = userService;
		
	}

	public login(){
		this.params = {username: this.username , password : this.password};

		this.userService.validateUser(this.params).then( 

			res => {
			
			if(res.success){
				this.localStorage.set('user', res.data.user);
				
				this.navCtrl.setRoot(MapPage);
			}else{
				let alert = this.alertCtrl.create({
				title: 'Error',
				subTitle: 'Invalid username or password',
				buttons: ['OK']
				});

				alert.present();
			}

		});


	}
}
