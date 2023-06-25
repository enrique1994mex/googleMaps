import {
  Component,
  OnInit,
  ElementRef,
  NgZone,
  ViewChild,
} from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  title = 'angular-google-map-search';

  @ViewChild('search')
  public searchElementRef!: ElementRef;
  @ViewChild(GoogleMap)
  public map!: GoogleMap;

  center!: google.maps.LatLngLiteral;
  zoom = 15;
  location = {
    lat: 0,
    lng: 0,
  };
  marker = {
    position: {
      lat: 0,
      lng: 0,
    },
    label: {
      color: '',
      text: '',
    },
    title: '',
    info: '',
    options: { draggable: true },
  };

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    // Binding autocomplete to search input control
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        //set latitude, longitude and zoom
        if (place.geometry.location) {
          this.location.lat = place.geometry.location?.lat();
          this.location.lng = place.geometry.location?.lng();
          this.addMarker(
            place.geometry.location?.lat(),
            place.geometry.location?.lng()
          );
        }
        this.center = {
          lat: this.location.lat,
          lng: this.location.lng,
        };
      });
    });
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.addMarker(position.coords.latitude, position.coords.longitude);
      this.location.lat = position.coords.latitude;
      this.location.lng = position.coords.longitude;
    });
  }

  addMarker(latitud: number, longitud: number) {
    this.marker = {
      position: {
        lat: latitud,
        lng: longitud,
      },
      label: {
        color: 'red',
        text: 'Marker label ',
      },
      title: 'Marker title ',
      info: 'Marker info ',
      options: { draggable: true },
    };
  }

  click(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.location.lat = event.latLng.lat();
      this.location.lng = event.latLng.lng();
      this.addMarker(event.latLng.lat(), event.latLng.lng());
    }
  }

  dragEnd(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.location.lat = event.latLng.lat();
      this.location.lng = event.latLng.lng();
      this.addMarker(event.latLng.lat(), event.latLng.lng());
    }
  }

  onSubmit() {
    this.center = {
      lat: this.location.lat,
      lng: this.location.lng,
    };
  }
}
