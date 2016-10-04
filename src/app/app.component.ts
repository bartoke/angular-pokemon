import { Component } from '@angular/core';


export class Pokemon {
  name: string;
  health: number;
}


@Component({
  selector: 'game',
  template: `{{pokemon.health}}`
})

export class AppComponent {
  pokemon: Pokemon = {
    name: "Pikachu",
    health: 300
  };
}