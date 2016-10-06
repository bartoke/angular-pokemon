import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'chat',
  template: `<div (click)="closeChat()">{{ message }}</div>`
})

export class ChatComponent {
  @Input() message: string;

  @Output() close: EventEmitter<any> = new EventEmitter();

  closeChat(): void {
    this.close.emit(null);
  }
}