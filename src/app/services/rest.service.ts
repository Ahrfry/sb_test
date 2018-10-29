
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/Rx';

@Injectable()



export class RestService {
  	http: any;
  	baseUrl: String;
  	test: any;
  
	constructor(public https: HttpClient) {
    	this.baseUrl = 'http://localhost/barkley_backend/index.php';
    	this.https = https;
    	
	}


	//gets url and params and create final url for post/get
	private url_creator(url , params){
		url = url + "?";
		console.log(params);
		for(let key in params){
			
			let value = params[key];
			
			url = url + key + "=" +  value + "&";
		}

		//castrates last &
		url = url.substring(0, url.length - 1);

		return url;
	}

  	public performRest(url , params) {
    	
    	url  = this.url_creator(url , params);
		console.log(url);
		
		return this.https.get(this.baseUrl + url, params).toPromise();

		
		
	}




    
}