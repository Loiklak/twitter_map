import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { onErrorResumeNext, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  constructor(private socket: Socket) { }

  loading: boolean;

  getTweets () {
    return this.socket
      .fromEvent<any>("tweetsList")
  }

  getNewTweets () {
    return this.socket
      .fromEvent<any>("newTweet")
  }

  getHashtag () {
    return this.socket
      .fromEvent<any>("hashtag")
  }

  sendDate (newDate) {
    this.socket.emit('fromDate', newDate)
  }
}
