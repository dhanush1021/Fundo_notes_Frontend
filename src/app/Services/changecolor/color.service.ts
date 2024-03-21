import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private buttonpressed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  boolean$ = this.buttonpressed.asObservable()
  buttonpressedcolor(value:any){
    this.buttonpressed.next(value)
  }
}
