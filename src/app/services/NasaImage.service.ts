import { NasaImage } from '../models/NasaImage.model';

import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/catch';

import { URLSearchParams, QueryEncoder } from '@angular/http';


@Injectable()
export class NasaImageService {

	readonly NASA_API_BASE = 'https://api.nasa.gov/mars-photos/api/v1/rovers/%rover%/photos'; // would later move this to config
	readonly NASA_API_KEY = 'aZlmHCp3jD9sanwE8KvytidYArlTvlhwr3fEhYyM'; // would later move this to config
	readonly ROVERS = [
		{
			'name': 'curiousity', 
			'cameras': [
				{'abbrev': 'FHAZ', 'name': 'Front Hazard Avoidance Camera'},
				{'abbrev': 'RHAZ', 'name': 'Rear Hazard Avoidance Camera'}

			]
		},
		{
			'name': 'opportunity', 
			'cameras': [
				{'abbrev': 'FHAZ', 'name': 'Front Hazard Avoidance Camera'},
				{'abbrev': 'RHAZ', 'name': 'Rear Hazard Avoidance Camera'}

			]
		},
		{
			'name': 'spirit', 
			'cameras': [
				{'abbrev': 'FHAZ', 'name': 'Front Hazard Avoidance Camera'},
				{'abbrev': 'RHAZ', 'name': 'Rear Hazard Avoidance Camera'}

			]
		}		
	];


	/*
	 * allow http to be injected so we could inject a mock backend for testing
	 */
    constructor(
        private http: Http
        )
    { 
        this.http = http;
    }

	/*
	 * returns an observable of the image api request
	 * @param filters Array of url params for nasa API. documented here: https://api.nasa.gov/api.html#MarsPhotos
	 */
	getImages(filters = {'rover': null}): Observable<NasaImage[]> {
  		let params = new URLSearchParams();
  		params.set('api_key', this.NASA_API_KEY);

  		let url = null;

  		if (typeof filters.rover != "undefined" && filters.rover != null) {
  			url = this.NASA_API_BASE.replace(/%rover%/,filters.rover);
  			delete filters.rover;
  		} else {
	  		// select a random rover
	  		let r = Math.floor(Math.random() * this.ROVERS.length);
	  		url = this.NASA_API_BASE.replace(/%rover%/,this.ROVERS[r].name);
   		}

  		for (let param in filters) {
  			params.set(param,filters[param]);
  		}

		return this.http.get(url, { search: params })
                    .map(this.extractData)
                    .catch(this.handleError);
	}


  	private extractData(res: Response) {
	    let body = res.json();
	    return body.photos || { };
  	}


	/*
	 * returns an observable of the image api request
	 * @param date Date earth day to return a random image
	 */
	getImageOfTheDay(d): Observable<NasaImage[]> {


  		let params = new URLSearchParams();
  		params.set('api_key', this.NASA_API_KEY);
  		let day = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
  		params.set('earth_date', day);

  		// select a random rover
  		let r = Math.floor(Math.random() * this.ROVERS.length);
  		let url = this.NASA_API_BASE.replace(/%rover%/,this.ROVERS[r].name);

  		console.log(url);
  		console.log(day);
		return this.http.get(url, { search: params })
                    .map(this.extractImageOfTheDay)
                    .catch(this.handleError);
	}	

  	private extractImageOfTheDay(res: Response) {
	    let body = res.json();
	    let l = body.photos.length;
	    let r = Math.floor(Math.random() * l);
	    console.log(body.photos[r]);
	    return body.photos[r] || { };
  	}

  	private handleError (error: Response | any) {
	    // In a real world app, we might use a remote logging infrastructure
	    let errMsg: string;
	    if (error instanceof Response) {
	      const body = error.json() || '';
	      const err = body.error || JSON.stringify(body);
	      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
	    } else {
	      errMsg = error.message ? error.message : error.toString();
	    }
	    console.error(errMsg);
	    return Observable.throw(errMsg);
  	}

  	
}

