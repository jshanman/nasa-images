import { Component } from '@angular/core';
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
  constructor(private NasaImageService: NasaImageService) {
    this.nasaImageService = NasaImageService;

  }

  


}
