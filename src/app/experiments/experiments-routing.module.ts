import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExperimentsContainerComponent } from './experiments-container.component';

@NgModule({
	declarations: [
		ExperimentsContainerComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: 'experiments',
				component: ExperimentsContainerComponent
			}
		])
	],
	exports: [
		RouterModule
	]
})
export class ExperimentsRoutingModule { }
