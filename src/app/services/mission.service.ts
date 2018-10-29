import { Injectable } from '@angular/core';

import 'rxjs/Rx';

import {RestService} from './rest.service'

@Injectable()

export class MissionService {
	
	rest: any;
	params: any;
	
	constructor(public restService: RestService) {
		
		this.rest = restService;

	}

	public getShelterMissions(shelter_id) {
		let param = {
			shelter_id : shelter_id,
			mission_id: "none",
			hero_id: 1
			}; 
		return this.rest.performRest("/mission/getmissions" , param);
		
	}

	//{mission_id : this.navParams.data.mission_id , user_id : this.user.id}
	public getMission(param) {
		 
		return this.rest.performRest("/mission/getmission" , param);
		
	}

	//{mission_id : this.navParams.data.mission_id , user_id : this.user.id}
	public acceptMission(param) {
		 
		return this.rest.performRest("/completion/acceptmission" , param);
		
	}	

	
    
}