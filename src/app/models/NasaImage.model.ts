export interface NasaImageInterface {
  image: string;
  caption: string;
  coords: string;
  date: string; //typescript datetime type?
}

export class NasaImage implements NasaImageInterface {
  image: string;
  caption: string;
  coords: string;
  date: string; //typescript datetime type?
  constructor(instance?: NasaImage) {
    Object.assign(this, instance);
  }
}
