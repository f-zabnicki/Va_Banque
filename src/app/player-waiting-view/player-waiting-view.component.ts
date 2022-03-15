import { Component} from '@angular/core';

@Component({
  selector: 'app-player-waiting-view',
  templateUrl: './player-waiting-view.component.html',
  styleUrls: ['./player-waiting-view.component.scss']
})
export class PlayerWaitingViewComponent{

  isGameAvailable : boolean = false;

  joinGame(){

  }
}
