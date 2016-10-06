import { Component } from '@angular/core';

import { Pokemon } from './pokemon';

@Component({
  selector: 'game',
  template: `
    <battle *ngIf="battle"
      [player] = "player"
      [enemy] = "enemy"></battle>
  `
})

export class AppComponent {
  battle: boolean = true;

  player: Pokemon = {
    name: "Pikachu",
    health: 300
  }; 

  enemy: Pokemon = {
    name: "Raichu",
    health: 300
  }; 

}