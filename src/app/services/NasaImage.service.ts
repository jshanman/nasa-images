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
			'name': 'curiosity', 
			'cameras': [
				{'abbrev': 'FHAZ', 'name': 'Front Hazard Avoidance Camera'},
				{'abbrev': 'RHAZ', 'name': 'Rear Hazard Avoidance Camera'},
				{'abbrev': 'MAST', 'name': 'Mast Camera'},				
				{'abbrev': 'CHEMCAM', 'name': 'Chemistry and Camera Complex'},
				{'abbrev': 'MAHLI', 'name': 'Mars Hand Lens Imager'},
				{'abbrev': 'MARDI', 'name': 'Mars Descent Imager'},
				{'abbrev': 'NAVCAM', 'name': 'Navigation Camera'}
			]
		},
		{
			'name': 'opportunity', 
			'cameras': [
				{'abbrev': 'FHAZ', 'name': 'Front Hazard Avoidance Camera'},
				{'abbrev': 'RHAZ', 'name': 'Rear Hazard Avoidance Camera'},
				{'abbrev': 'NAVCAM', 'name': 'Navigation Camera'},
				{'abbrev': 'PANCAM', 'name': 'Panoramic Camera'},
				{'abbrev': 'MINITES', 'name': 'Miniature Thermal Emission Spectrometer'}
			]
		}		
	];

	private manifests = {};


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
  		// if rover was sent in the params, alter the api url
  		if (typeof filters.rover != "undefined" && filters.rover != null) {
  			url = this.NASA_API_BASE.replace(/%rover%/,filters.rover);
  			delete filters.rover;
  		// no rover was specified in the params
  		} else {
	  		// select a random rover
	  		let r = Math.floor(Math.random() * this.ROVERS.length);
	  		url = this.NASA_API_BASE.replace(/%rover%/,this.ROVERS[r].name);
   		}

   		// apply all filters
  		for (let param in filters) {
  			if (param == "earth_date" && filters[param] instanceof Date) {
  				let d = filters[param];
  				filters[param] = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();		
  			}
  			params.set(param,filters[param]);
  		}

		return this.http.get(url, { search: params })
                    .map(this.extractData)
                    .catch(this.handleError);
	}

	// extras the photos from the response
  	private extractData(res: Response) {
	    let body = res.json();
	    return body.photos || { };
  	}


	/*
	 * returns an observable of the image api request
	 * @param date Date earth day to return a random image
	 */
	getImageOfTheDay(d): Observable<NasaImage[]> {
		// date in yyyy-mm-dd format
  		let day = d.getFullYear()+'-'+('0' + (d.getMonth()+1)).slice(-2)+'-'+('0' + d.getDate()).slice(-2);

  		// apply api key
  		let params = new URLSearchParams();
  		params.set('api_key', this.NASA_API_KEY);

  		// apply date
  		params.set('earth_date', day);

  		// select a random rover
  		let rover_index = Math.floor(Math.random() * this.ROVERS.length);

  		// build url
  		let url = this.NASA_API_BASE.replace(/%rover%/,this.ROVERS[rover_index].name);

  		// search the first rover
		return this.http.get(url, { search: params })
                    .map(this.extractImageOfTheDay)
                    .catch((error: Response | any) => { 
                   		if (error instanceof Response) {

                  			let body = error.json() || '';
                  			// if the error is no photos found for this day
                  			if (body.errors && body.errors == "No Photos Found") {
                  				// try the other rover @fixme if there are additional rovers added
                  				let next_rover_index = (rover_index == 1) ? 0 : 1;
                  				let url = this.NASA_API_BASE.replace(/%rover%/,this.ROVERS[next_rover_index].name);

				        		return this.http.get(url, { search: params })
                				    .map(this.extractImageOfTheDay)
                    				.catch(this.handleError);
                  			}
                  		}
                  		// if different error, send to regular error handler
                  		return this.handleError(error);
                  	});
	}	

	// picks one random image from the result set
  	private extractImageOfTheDay(res: Response) {
	    let body = res.json();
	    let l = body.photos.length;
	    let r = Math.floor(Math.random() * l);
	    return body.photos[r] || { };
  	}

  	// returns the rover data array for the specific rover by name
  	// @thows TypeError
  	getRover(rover: string) {
  		for (let r = 0; r < this.ROVERS.length; r++) {
  			if (this.ROVERS[r].name == rover) {
  				return this.ROVERS[r];
  			}
  		}
  		throw new TypeError('Invalid rover sent to getRover: '+rover);	
  	}

  	// note the error in the console
  	private handleError (error: Response | any) {
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

