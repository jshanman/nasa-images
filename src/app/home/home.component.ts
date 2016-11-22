import { Component, OnInit } from '@angular/core';

import { NasaImageService } from '../services/NasaImage.service';

@Component({
  selector: 'home',  // <home></home>
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private nasaImageService: any;
  public image: string;
  public errorMessage: string;

  constructor(private NasaImageService: NasaImageService) {
    this.nasaImageService = NasaImageService;


  }
  // auto reload isn't working? need to do a work-around to show a new random image without reloading page
  // https://github.com/angular/angular/issues/9811
  ngOnInit(){
    let d = new Date();
    // yesterday
    d.setDate(d.getDate() - 1);
    this.nasaImageService.getImageOfTheDay(d).subscribe(
                       image => this.image = image,
                       error =>  this.errorMessage = <any>error);

  }

}
