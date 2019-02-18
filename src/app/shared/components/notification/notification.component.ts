import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { WithTimeout } from '../../mixins';

@Component({
	selector: 'rg-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent implements OnInit, OnDestroy {

	@Input() message: string;
	@Input() duration = 3000;
	@Input() code: 'success' | 'error' | 'neutral' = 'neutral';

	constructor(private snackbar: MatSnackBar) { }

	private snackbarRef: MatSnackBarRef<any>;

	@WithTimeout()
	ngOnInit() {
		this.snackbarRef = this.snackbar.open(this.message, '', {
			duration: this.duration,
			panelClass: this.code === 'success' ? 'success-snackbar' : this.code === 'error' ? 'error-snackbar' : ''
		});
	}

	ngOnDestroy() {
		this.snackbarRef.dismiss();
	}

}
