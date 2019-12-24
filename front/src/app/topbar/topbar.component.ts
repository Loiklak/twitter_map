import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.sass']
})
export class TopbarComponent implements OnInit {

  //Il faudra récupérer le hashtag à la connexion à la socket 
  hashtag:string;

  constructor(private socketService: SocketService) {}

  ngOnInit() {

    this.socketService
      .getHashtag()
      .subscribe(hashtag => this.hashtag = hashtag);
  }

}