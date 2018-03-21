import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services';

@Component({
  selector: 'rg-facebook-sign-in',
  templateUrl: './facebook-sign-in.component.html',
  styleUrls: ['./facebook-sign-in.component.scss']
})
export class FacebookSignInComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.signIn('FACEBOOK')
      .then(() => {
        debugger;
      })
      .catch(() => {
        debugger;
      });
  }

}
