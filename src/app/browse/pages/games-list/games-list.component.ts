import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'rg-games-list-page',
	template: `
    <rg-browse-layout>
        <rg-games-list>
        </rg-games-list>
    </rg-browse-layout>
`,
	styles: []
})
export class GamesListPage implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
