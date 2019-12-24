import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private socketService: SocketService){}

  tweets = {
    "type": "FeatureCollection",                                                                 
    "features": []
  };

  //Location example : { "type": "Point", "coordinates": [ -117.1413333, 34.297 ] }
  loc2feature = (geometry) => {
    return { "type": "Feature", "geometry": geometry }
  }

  async ngOnInit() {

    this.socketService.loading = true;
    
    this.socketService
      .getTweets()
      .subscribe(array => {
        this.tweets.features = array.map(object=>this.loc2feature(object.location));
        this.tweets = { ...this.tweets }
        this.socketService.loading = false;
      });

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
