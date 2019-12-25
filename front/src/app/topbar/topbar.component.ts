import { Component, OnInit, Input } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.sass']
})
export class TopbarComponent implements OnInit {

  search_term:string;
  date:string;
  hour:string;

  onLoadDate(){
    this.socketService.sendDate({date: this.date, hour: this.hour})
    this.socketService.loading = true;
  }
  
  constructor(private socketService: SocketService) {}

  ngOnInit() {

    this.socketService
      .getSearchTerm()
      .subscribe(search_term => {this.search_term = search_term;});

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      this.date= yyyy+"-"+mm+"-"+dd;

      var minutes = today.getMinutes().toString();
      var hour = today.getHours().toString();
      if (hour.length==1) {
        hour = 0 + hour;
      }
      if (minutes.length==1) {
        minutes = 0 + minutes;
      }
      this.hour = hour+":"+minutes;
  }

}