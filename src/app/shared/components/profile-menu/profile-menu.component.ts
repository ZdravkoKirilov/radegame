import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from '@app/core';
import { selectUser, LogoutAction } from '../../../core/state';
import { User } from '../../../core/models';
import { AutoUnsubscribe } from '../../mixins';

@Component({
  selector: 'rg-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
@AutoUnsubscribe()
export class ProfileMenuComponent implements OnInit {

  user$: Subscription;
  user: User;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.user$ = this.store.pipe(
      select(selectUser),
      map(user => this.user = user)
    ).subscribe();
  }

  handleLogout() {
    this.store.dispatch(new LogoutAction());
  }

}
