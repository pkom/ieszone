import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

const directionService = new google.maps.DirectionsService();

@Component({
  selector: 'iz-my-route',
  templateUrl: './my-route.component.html',
  styleUrls: ['./my-route.component.scss'],
})
export class MyRouteComponent implements OnInit {
  @ViewChild('gmap') gmap: GoogleMap;
  renderer: google.maps.DirectionsRenderer;

  center: google.maps.LatLngLiteral = { lat: 12.918545, lng: 80.173611 };
  zoom = 15;

  constructor() {}

  ngAfterViewInit(): void {
    const map = this.gmap.googleMap;
    this.renderer = new google.maps.DirectionsRenderer({ map });
  }

  ngOnInit(): void {
    directionService.route(
      {
        origin: { lat: 12.906023, lng: 80.200391 },
        destination: { lat: 12.92985, lng: 80.134056 },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === 'OK') {
          this.renderer.setDirections(response);
        }
      },
    );
  }
}
