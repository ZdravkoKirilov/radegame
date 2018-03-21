import { Component, Input } from '@angular/core';

import { BUTTON_TYPES, ButtonType } from '../../models';

@Component({
  selector: 'rg-social-button',
  templateUrl: './social-button.component.html',
  styleUrls: ['./social-button.component.scss']
})
export class SocialButtonComponent {

  @Input() type: ButtonType;
  @Input() label: string;

  types = BUTTON_TYPES;

}
