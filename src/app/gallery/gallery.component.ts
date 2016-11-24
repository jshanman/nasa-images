import { Component, OnInit } from '@angular/core';
import { NasaImageService } from '../services/NasaImage.service';

/*
 * This component is responsible for showing the gallery of nasa images
 */
@Component({
  selector: 'gallery',
  styles: [`
  `],
  templateUrl: './gallery.component.html'
})
export class GalleryComponent {
  nasaImageService: any;
  public images_curiosity: any;
  public images_opportunity: any;

  public errorMessage: string;  

  constructor(private NasaImageService: NasaImageService) {
    this.nasaImageService = NasaImageService;


  }

  ngOnInit(){

    let d = new Date();
    // yesterday
    d.setDate(d.getDate() - 1);
    let day = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();

    this.nasaImageService.getImages({'earth_date': day, 'rover': 'curiosity'}).subscribe(
                       images_curiosity => this.images_curiosity = images_curiosity,
                       error =>  this.errorMessage = <any>error);


    this.nasaImageService.getImages({'earth_date': day, 'rover': 'opportunity'}).subscribe(
                       images_opportunity => this.images_opportunity = images_opportunity,
                       error =>  this.errorMessage = <any>error);



  }


}
