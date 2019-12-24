import { Component } from '@angular/core';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(private socketService: SocketService) {}

  tweets = ['ok']
  caca = []

  ngOnInit() {
    /*this.socketService
      .getTweets()
      //.subscribe(array => this.caca = array.map(object=>(object.location)));
      .subscribe(array => this.tweets = array);

    this.socketService
      .getNewTweets()
      .subscribe((location) => {this.tweets.push(location)});*/
  }
}