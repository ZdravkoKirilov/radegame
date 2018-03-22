import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  save(key: string, data: any, stringify = false): void {
    if (stringify) {
      data = JSON.stringify(data);
    }
    localStorage.setItem(key, data);
  }

  get(key: string, parse = false): any {
    let data = localStorage.getItem(key);

    if (data && parse) {
      data = JSON.parse(data);
    }
    return data;
  }

}
