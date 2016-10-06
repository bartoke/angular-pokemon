
export enum PokemonType {
  Normal,
  Fire,
  Water
};

export class Pokemon {
  
  name: string;
  health: number;

  static effectivity(caster: PokemonType, target: PokemonType): number {
    switch(caster) {
      case PokemonType.Normal:
        switch(target) {
          case PokemonType.Normal: return 1;
          case PokemonType.Fire:   return 1;
          case PokemonType.Water:  return 1;
          default: break;
        }
      case PokemonType.Fire:
        switch(target) {
          case PokemonType.Normal: return 1;
          case PokemonType.Fire:   return 0.5;
          case PokemonType.Water:  return 0.25;
          default: break;
        }
      case PokemonType.Water:
        switch(target) {
          case PokemonType.Normal: return 1;
          case PokemonType.Fire:   return 2;
          case PokemonType.Water:  return 0.5;
          default: break;
        }
      default: return 1;
    }
  }
}