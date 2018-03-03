import { Component, Output, EventEmitter } from '@angular/core';

import { SignInPayload } from '../../models/';

@Component({
  selector: 'rg-sign-in-view',
  templateUrl: './sign-in-view.component.html',
  styleUrls: ['./sign-in-view.component.scss']
})
export class SignInViewComponent {

  @Output() signIn: EventEmitter<SignInPayload> = new EventEmitter();

}
