import { NgModule }	     from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChatComponent } from './battle/chat.component';
import { BattleComponent } from './battle/battle.component';
import { PokemonComponent } from './battle/pokemon.component';

import { TurnService } from './turn.service';
import { AttackService } from './attack.service';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ 
    AppComponent,
    ChatComponent,
    BattleComponent,
    PokemonComponent
  ],
  providers:    [ 
    TurnService,
    AttackService
  ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }