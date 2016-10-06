import { Injectable } from '@angular/core';

import { PokemonType, Pokemon } from './pokemon';

export enum AttackCategory {
  Damage,
  Status
}

export class Attack {
  name: string;
  power: number;
  accuracy: number;
  type: PokemonType;
  category: AttackCategory;
}

const attacks: Attack[] = [
  {
    name: "Scratch",
    power: 40,
    accuracy: 100,
    type: PokemonType.Normal,
    category: AttackCategory.Damage
  }
];


@Injectable()
export class AttackService {

  attacks: Attack[] = attacks;
  
  hit(attack: Attack, caster: Pokemon, target: Pokemon): number {
    if(attack.accuracy < 100) {
      let r: number = Math.random() * 100;

      if(r > attack.accuracy) {
        return 0;
      }
    }

    return attack.power;
  }
}