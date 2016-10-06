import { Component, Input, OnInit } from '@angular/core';

import { Pokemon } from '../pokemon';


@Component({
  selector: 'pokemon',
  templateUrl: 'app/battle/pokemon.component.html'
})

export class PokemonComponent implements OnInit {
  @Input() pokemon: Pokemon;
  @Input() type: string;

  private max_health: number;

  ngOnInit() {
    this.max_health = this.pokemon.health;
  }
}