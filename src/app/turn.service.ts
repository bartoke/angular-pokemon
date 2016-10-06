import { Injectable } from '@angular/core';

import { Pokemon } from './pokemon';


export enum TaskType {
  Chat, Damage, Status
}

export interface Task {
  type: TaskType;
  data: any;
}


@Injectable()
export class TurnService {
  turn: Task[] = [];

  hasNextTask(): boolean {
    return this.turn.length > 0;
  };

  hasEnded(): boolean {
    return this.turn.length == 0;
  }

  addTask(task: Task): void {
    this.turn.push(task);
  };

  nextTask(): Task {
    return this.turn.shift();
  };

}