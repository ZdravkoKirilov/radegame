import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class BrowseService {

	constructor(private http: HttpClient) { }

	fetchLobby(name: string) {
		return Observable.create(observer => {
			observer.next(new Date().getTime() % 2 === 0);
		});
	}

	fetchLobbies() {

	}

	createLobby() {

	}

	deleteLobby() {

	}
}
