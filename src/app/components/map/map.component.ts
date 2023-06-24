import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  location = {
    latitud: '',
    longitud: '',
  };

  onSubmit() {
    console.log(this.location);
  }
}
