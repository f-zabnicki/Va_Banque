import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { Observable, of, Subject } from 'rxjs';
import { Player } from 'src/models/Player';
import { PlayerInGame } from 'src/models/PlayerInGame';
import { QuestionInGame } from 'src/models/QuestionInGame';


@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection!: signalR.HubConnection;
  private subject = new Subject<any>();

  constructor() { }

  public start = () =>{
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:7272/vabanqueHub')
    .build();

    this.hubConnection
    .start()
    .then(() => console.log("co tu sie dzieje => połączono z hubem"))
    .catch(error => console.log('coś się popsulo totalnie: ' + error))
  }

  public startConnection = (data: string) =>{
    this.hubConnection.invoke('startConnection',data).catch(res =>{
      console.log(res);
      console.log("zlapana ko")
    })
  }
  public updateGame = (users: PlayerInGame[], questions: QuestionInGame[]) =>{
    this.hubConnection.invoke('GetGameDetails', users, questions);
  }
  public getGameUpdated = () =>{
    this.hubConnection.on('gameDetails', (players, questions) =>{
      this.sendUpdate(players, questions);
    })
  }

  sendUpdate(usersArray:PlayerInGame[], questionArray: QuestionInGame[]){
    this.subject.next({users: usersArray, questions: questionArray});
  }

  public onUpdate() : Observable<any>{
    return this.subject.asObservable();
  }
}
