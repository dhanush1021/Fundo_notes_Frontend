import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasendingService {
  private buttonpressedsubject: Subject<void> = new Subject<void>()
  buttonpressed$ = this.buttonpressedsubject.asObservable()
  triggeredbuttinpressed(){
    this.buttonpressedsubject.next();
  }
}
