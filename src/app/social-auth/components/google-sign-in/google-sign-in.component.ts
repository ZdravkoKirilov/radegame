import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services';

@Component({
  selector: 'rg-google-sign-in',
  templateUrl: './google-sign-in.component.html',
  styleUrls: ['./google-sign-in.component.scss']
})
export class GoogleSignInComponent implements OnInit {

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.authService.signIn('GOOGLE')
      .then(user => {
        debugger;
      })
      .catch(err => {
        console.error(err);
      });
  }

}
