/*import { ActivatedRoute, Data } from '@angular/router';
import { Component } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

// Load the implementations that should be tested
import { GalleryComponent } from './gallery.component';

describe('Gallery', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      // provide a better mock
      {
        provide: ActivatedRoute,
        useValue: {
          data: {
            subscribe: (fn: (value: Data) => void) => fn({
              yourData: 'yolo'
            })
          }
        }
      },
      GalleryComponent
    ]
  }));

  it('should log ngOnInit', inject([GalleryComponent], (gallery: GalleryComponent) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    gallery.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
*/