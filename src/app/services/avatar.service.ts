import { Injectable } from '@angular/core';

import 'rxjs/Rx';

import {RestService} from './rest.service'

@Injectable()

export class AvatarService {
	
	rest: any;
	params: any;
	
	constructor(public restService: RestService) {
		
		this.rest = restService;

	}

		
	public getAvatar(param) {
		 
		return this.rest.performRest("/avatar/getavatar" , param);
		
	}

	

	
    
}