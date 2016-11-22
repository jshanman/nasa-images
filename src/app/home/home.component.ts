import { Component } from '@angular/core';

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

    let d = new Date();

    this.nasaImageService.getImageOfTheDay(d).subscribe(
                       image => this.image = image,
                       error =>  this.errorMessage = <any>error);

  }

}
