import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameBoardComponent } from './game-board/game-board.component';
import { BoardFieldComponent } from './board-field/board-field.component';
import { TriviaBoardComponent } from './trivia-board/trivia-board.component';
import { PlayerControlsComponent } from './player-controls/player-controls.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GameBoardComponent, BoardFieldComponent, TriviaBoardComponent, PlayerControlsComponent]
})
export class GameElementsModule { }
