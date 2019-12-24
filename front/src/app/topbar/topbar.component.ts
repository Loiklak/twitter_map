import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.sass']
})
export class TopbarComponent implements OnInit {

  //Il faudra récupérer le hashtag à la connexion à la socket 
  hashtag:string = 'Trump';

  constructor() { }

  ngOnInit() {
  }

}