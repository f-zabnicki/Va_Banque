import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from 'src/models/Player';

@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.scss'],
})
export class UserButtonComponent {

  @Input() users!: any[];
  @Input() index!: number;
  @Output() userSelectedEvent = new EventEmitter<[Player, number]>();
  selectedUser!: Player;

  onElementClick(user: Player) {
    this.selectedUser = user;
    this.userSelectedEvent.emit([user, this.index]);
  }
}
