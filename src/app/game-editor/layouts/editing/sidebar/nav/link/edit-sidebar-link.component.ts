import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'rg-edit-sidebar-link',
	templateUrl: './edit-sidebar-link.component.html',
	styleUrls: ['./edit-sidebar-link.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditSidebarLinkComponent {

	@Input() link: string;

}
