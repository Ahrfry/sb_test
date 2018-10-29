import { Injectable } from '@angular/core';

import 'rxjs/Rx';

import {RestService} from './rest.service'

@Injectable()

export class UserService {
	
	rest: any;
	
	params: any;
	user: any;

	constructor(public restService: RestService) {
		
		this.rest = restService;

	}

	public getUser(user_id) {
		
		return this.rest.performRest("/user/getUser" , {user_id : user_id , test: "test"});
		
	}

	public getSurroundings(load) {
		
		return this.rest.performRest('/User/GetSurroundingUsers' , load);
		
	}

	public validateUser(params){
		return this.rest.performRest("/site/login" , params);	
	}


    
}