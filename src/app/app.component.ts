import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state-store/index';
import 'rxjs/add/operator/map';

@Component({
  selector: 'rg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private store: Store<AppState>) {}
    ngOnInit() {
        this.store.select('router')
        .map(data => {
            console.log(data);
        })
        .subscribe();
    }
}
