import { Component, OnInit } from '@angular/core';

import { NasaImageService } from '../services/NasaImage.service';

import {CalendarModule} from 'primeng/primeng';


@Component({
  selector: 'home',  // <home></home>
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private nasaImageService: any;
  public image: string | boolean = null;
  public errorMessage: string;
  public date: Date;


  constructor(private NasaImageService: NasaImageService) {
    this.nasaImageService = NasaImageService;


  }

  ngOnInit(){

    let d = new Date();

    // yesterday
    d.setDate(d.getDate() - 1);

    // set date
    this.date = d;

    // get image of the day for this date
    this.nasaImageService.getImageOfTheDay(d).subscribe(
                       image => this.image = image,
                       error =>  {
                         this.errorMessage = <any>error;
                         this.image = false;
                        });

  }


  // when a new date is selected on the page, refresh the image
  selectNewDate() {

    this.nasaImageService.getImageOfTheDay(this.date).subscribe(
                       image => {
                         this.image = image;
                         console.log(image);
                       },
                       error =>  {
                         this.errorMessage = <any>error;
                         this.image = false;
                        });
  }

}
