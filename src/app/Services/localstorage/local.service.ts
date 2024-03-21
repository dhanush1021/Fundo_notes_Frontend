import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  item:any;
  constructor() { }
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    if (typeof localStorage !== 'undefined' && localStorage !== null) {
       this.item = localStorage.getItem(key);
       console.log('no Error');
    } else {
      console.log('Local storage does not exist');
    }
    return this.item ? this.item : null;
}
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
