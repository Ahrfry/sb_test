import { Injectable } from '@angular/core';

import 'rxjs/Rx';

import {RestService} from './rest.service'

@Injectable()

export class ShelterService {
	
	rest: any;
	params: any;
	
	constructor(public restService: RestService) {
		
		this.rest = restService;

	}

	public getShelter(param) {
		
		return this.rest.performRest("/shelter/getShelterDetails" , param);
		
	}

	public getReviews(param) {
		
		return this.rest.performRest("/shelter/getShelterReviews" , param);
		
	}

	public setRating(param) {
		
		return this.rest.performRest("/shelter/setRating" , param);
		
	}

	
    
}