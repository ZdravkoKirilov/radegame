import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameBoardComponent } from './game-board/game-board.component';
import { BoardFieldComponent } from './board-field/board-field.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GameBoardComponent, BoardFieldComponent]
})
export class GameElementsModule { }
