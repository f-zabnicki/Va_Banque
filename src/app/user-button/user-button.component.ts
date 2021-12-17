import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from 'src/models/Player';

@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.scss'],
})
export class UserButtonComponent implements OnInit {
  
  @Input() users!: any[];
  @Input() index!: number;

  selectedUser!: Player;

  @Output() userSelectedEvent = new EventEmitter<[Player, number]>();

  constructor() {}

  ngOnInit(): void {}

  onElementClick(user: Player){
    this.selectedUser = user;
    this.userSelectedEvent.emit([user, this.index]);
  }
}
