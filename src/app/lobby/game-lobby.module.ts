import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './routing';
import { LobbyFormComponent } from './components/form/lobby-form.component';

@NgModule({
	declarations: [
		LobbyFormComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	],
	entryComponents: [
		LobbyFormComponent
	]
})
export class GameLobbyModule { }
