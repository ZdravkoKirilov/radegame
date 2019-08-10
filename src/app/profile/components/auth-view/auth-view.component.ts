import { Component, Output, EventEmitter } from '@angular/core';
import { SignInPayload } from '../../models';

@Component({
  selector: 'rg-auth-view',
  templateUrl: './auth-view.component.html',
  styleUrls: ['./auth-view.component.scss']
})
export class AuthViewComponent {

  @Output() signIn: EventEmitter<SignInPayload> = new EventEmitter();

}
