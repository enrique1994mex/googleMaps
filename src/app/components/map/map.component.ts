import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
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
    console.log(this.location);
  }
}
