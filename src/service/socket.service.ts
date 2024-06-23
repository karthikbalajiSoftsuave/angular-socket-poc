import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { PATHS, SOCKET_EVENTS } from '../utils/constants';

export interface IReview {
  review: string,
  thesisId: string,
  from: string,
  createdTime: Date,
  updatedTime: Date
}


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private readonly SOCKET_ENDPOINT = `http://localhost:8081`;
  public socket!: Socket;
  constructor() {
    this.socket = io(this.SOCKET_ENDPOINT, {
      path: PATHS.SOCKET
    });
  }

  public joinRoom(thesisId: string): void {
    this.socket.emit(SOCKET_EVENTS.JOIN_ROOM, thesisId)
  }

  public sendReview(review: IReview): void {
    this.socket.emit(SOCKET_EVENTS.ADD_REVIEW, review);
  }

  public getReviews(): Observable<IReview[]> {
    return new Observable((observer) => {
      this.socket.on(SOCKET_EVENTS.NEW_REVIEW, (reviews) => {
        observer.next(reviews);
      });
    });
  }

}
