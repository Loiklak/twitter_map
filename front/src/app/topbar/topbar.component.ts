import { Component, OnInit, Input } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.sass']
})
export class TopbarComponent implements OnInit {

  hashtag:string;
  date:string;

  onLoadDate(){
    this.socketService.sendDate(this.date)
    this.socketService.loading = true;
  }
  
  constructor(private socketService: SocketService) {}

  ngOnInit() {

    this.socketService
      .getHashtag()
      .subscribe(hashtag => {this.hashtag = hashtag;});

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      this.date= yyyy+"-"+mm+"-"+dd;
  }

}