import { NasaImageService } from './NasaImage.service';

import {
    Http,
    ConnectionBackend,
    BaseRequestOptions,
    ResponseOptions,
    Response
} from '@angular/http';
import { Injector, provide, Observable, Subject } from '@angular/angular2';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { inject, TestBed } from '@angular/core/testing';


describe('NasaImageService', () => {

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BaseRequestOptions,
      MockBackend,
      {
        provide: Http,
        useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
      NasaImageService
    ]
  }));

  it('getRover should throw error on invalid rover', inject([NasaImageService], (service: NasaImageService) => {

    expect(function() {
      service.getRover('bla');
    }).toThrowError(TypeError);

  }));

  it('getRover should return curiosity', inject([NasaImageService], (service: NasaImageService) => {

    for (let i = 0; i < service.ROVERS.length; i++) {
      if (service.ROVERS[i].name === 'curiosity') {
        var data = service.ROVERS[i];
      }
    }
    expect(service.getRover('curiosity')).toEqual(data);

  }));

  it('getRover should return opportunity', inject([NasaImageService], (service: NasaImageService) => {

    for (let i = 0; i < service.ROVERS.length; i++) {
      if (service.ROVERS[i].name === 'opportunity') {
        var data = service.ROVERS[i];
      }
    }
    expect(service.getRover('opportunity')).toEqual(data);

  }));

   
  it('getImages should return data for rover & earth date', inject([NasaImageService, MockBackend], (service: NasaImageService, backend: MockBackend) => {
    backend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
                body:'{"photos": [ { "id": 599561, "sol": 4561, "camera": { "id": 16, "name": "NAVCAM", "rover_id": 6, "full_name": "Navigation Camera" }, "img_src": "http:\/\/mars.nasa.gov\/mer\/gallery\/all\/1\/n\/4561\/1N533089636EFFCTNUP1984L0M1-BR.JPG", "earth_date": "2016-11-23", "rover": { "id": 6, "name": "Opportunity", "landing_date": "2004-01-25", "launch_date": "2003-07-07", "status": "active", "max_sol": 4566, "max_date": "2016-11-28", "total_photos": 185176, "cameras": [ { "name": "FHAZ", "full_name": "Front Hazard Avoidance Camera" }, { "name": "NAVCAM", "full_name": "Navigation Camera" }, { "name": "PANCAM", "full_name": "Panoramic Camera" }, { "name": "MINITES", "full_name": "Miniature Thermal Emission Spectrometer (Mini-TES)" }, { "name": "ENTRY", "full_name": "Entry, Descent, and Landing Camera" }, { "name": "RHAZ", "full_name": "Rear Hazard Avoidance Camera" } ] } }, { "id": 599562, "sol": 4561, "camera": { "id": 16, "name": "NAVCAM", "rover_id": 6, "full_name": "Navigation Camera" }, "img_src": "http:\/\/mars.nasa.gov\/mer\/gallery\/all\/1\/n\/4561\/1N533089636EFFCTNUP1984R0M1-BR.JPG", "earth_date": "2016-11-23", "rover": { "id": 6, "name": "Opportunity", "landing_date": "2004-01-25", "launch_date": "2003-07-07", "status": "active", "max_sol": 4566, "max_date": "2016-11-28", "total_photos": 185176, "cameras": [ { "name": "FHAZ", "full_name": "Front Hazard Avoidance Camera" }, { "name": "NAVCAM", "full_name": "Navigation Camera" }, { "name": "PANCAM", "full_name": "Panoramic Camera" }, { "name": "MINITES", "full_name": "Miniature Thermal Emission Spectrometer (Mini-TES)" }, { "name": "ENTRY", "full_name": "Entry, Descent, and Landing Camera" }, { "name": "RHAZ", "full_name": "Rear Hazard Avoidance Camera" } ] } }]}' }
            )));
        });


    var d = new Date('2016-11-23');
    d.setFullYear(2016);
    d.setMonth
    service.getImages('opportunity',d).subscribe((images) => {
      expect(images.length).toBe(2);
      expect(images[0].id).toBe(599561);
    });

  }));

// getImages should return data for rover & camera


});
