import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppLocalStorageService {

  save(key: string, data: any, stringify = false): void {
    if (stringify) {
      data = JSON.stringify(data);
    }
    localStorage.setItem(key, data);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  get(key: string, parse = false): any {
    let data = localStorage.getItem(key);

    if (data && parse) {
      data = JSON.parse(data);
    }
    return data;
  }

}
