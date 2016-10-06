import { Component, Input } from '@angular/core';

import { Pokemon } from '../pokemon';

import { TaskType, Task, TurnService } from '../turn.service';
import { Attack, AttackService } from '../attack.service';

@Component({
  selector: 'battle',
  templateUrl: 'app/battle/battle.component.html'
})

export class BattleComponent {
  @Input() player: Pokemon;
  @Input() enemy: Pokemon;

  chatVisible: boolean = false;
  chatText: string;


  constructor(private turnService: TurnService, private attackService: AttackService) { }

  closeChat(): void {
    this.chatVisible = false;

    this.turn();
  }

  damage(caster: Pokemon, target: Pokemon): void {

    let attack: Attack = this.attackService.attacks[0];
    let damage: number = this.attackService.hit(attack, caster, target);

    this.turnService.addTask({
      type: TaskType.Chat, 
      data: {
        message: `${caster.name} used ${attack.name}`
      }
    });

    this.turnService.addTask({
      type: TaskType.Chat, 
      data: {
        message: `It dealt ${damage} damage`
      }
    });

    console.log(this.turnService.turn);
    this.turn();
  }

  turn(): void {
    if(this.turnService.hasNextTask()) {

      let task: Task = this.turnService.nextTask();

      switch(task.type) {
        case TaskType.Chat: 
          this.chatText = task.data.message;
          this.chatVisible = true;
          break;
        default:
          break;
      }



    } else {
      console.log("Tasks run!");
    }
  }
}