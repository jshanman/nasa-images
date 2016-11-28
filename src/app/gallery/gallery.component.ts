import { Component, OnInit } from '@angular/core';
import { NasaImageService } from '../services/NasaImage.service';
import { DropdownModule } from 'primeng/primeng';
import { DataGridModule } from 'primeng/primeng';
/*
 * This component is responsible for showing the gallery of nasa images
 */
@Component({
  selector: 'gallery',
  styleUrls: [ './gallery.component.css' ],  
  templateUrl: './gallery.component.html'
})
export class GalleryComponent {
  nasaImageService: any;
  public images_curiosity: any = null;
  public images_opportunity: any = null;
  public opportunitySelectedCamera: any;
  public curiositySelectedCamera: any;
  public curiosityCameras: any;
  public opportunityCameras: any;
  public errorMessage: string;  
  public date: Date;

  constructor(private NasaImageService: NasaImageService) {
    this.nasaImageService = NasaImageService;


  }

  ngOnInit(){

    let d = new Date();

    // yesterday
    d.setDate(d.getDate() - 1);
    this.date = d;

    // populate cameras
    this.curiosityCameras = this.nasaImageService.getRover('curiosity').cameras.map((rover) => {let o: any = {}; o.label = rover.name; o.value=rover.abbrev; return o;});

    this.opportunitySelectedCamera = this.curiosityCameras[0];

    this.opportunityCameras = this.nasaImageService.getRover('opportunity').cameras.map((rover) => {let o: any = {}; o.label = rover.name; o.value=rover.abbrev; return o;});

    this.curiositySelectedCamera = this.opportunityCameras[0];


    this.nasaImageService.getImages({'earth_date': this.date, 'rover': 'curiosity'}).subscribe(
                       images_curiosity => this.images_curiosity = images_curiosity,
                       error => {
                         this.errorMessage = <any>error;
                         this.images_curiosity = [];
                       } );


    this.nasaImageService.getImages({'earth_date': this.date, 'rover': 'opportunity'}).subscribe(
                       images_opportunity => this.images_opportunity = images_opportunity,
                       error =>  {
                         this.errorMessage = <any>error;
                         this.images_opportunity = [];
                       });



  }


  // a new camera is selected
  onCameraSelect(rover) {

    // reset images for this rover
    this['images_'+rover] = null;

    // set selected camera
    for (let ri = 0; ri < this[rover+'Cameras'].length; ri++) {
      let camera = this[rover+'Cameras'][ri];
      if (camera.abbrev == this[rover+'SelectedCameraValue']) {
            this[rover+'SelectedCamera'] = camera;
            break;        
      }
    }
    // get images
    this.nasaImageService.getImages({'earth_date': this.date, 'rover': rover, 'camera': this[rover+'SelectedCameraValue']}).subscribe(
                       images => this['images_'+rover] = images,
                       error =>  {
                         this.errorMessage = <any>error;
                         this['images_'+rover] = [];
                       });

  }


  // when a new date is selected on the page, refresh the images for this date
  selectNewDate() {

    this.onCameraSelect('curiosity');

    this.onCameraSelect('opportunity');
  }

}
