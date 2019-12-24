import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private socketService: SocketService){}

  earthquakes: object;

  tweets = {
    "type": "FeatureCollection",                                                                 
    "features": []
  };

  //Location example : { "type": "Point", "coordinates": [ -117.1413333, 34.297 ] }
  loc2feature = (geometry) => {
    return { "type": "Feature", "geometry": geometry }
  }

  async ngOnInit() {
    this.earthquakes = await import('./earthquake.json');
    
    this.socketService
      .getTweets()
      .subscribe(array => this.tweets.features = array.map(object=>this.loc2feature(object.location)));

    this.socketService
      .getNewTweets()
      .subscribe(
        location => {
          this.tweets.features.push(this.loc2feature(location));
          this.tweets = { ...this.tweets } //Pour mettre à jour le truc mdrrrr peut etre que la map s'actualise quand l'identifiant change
        }
      );
  }
}
