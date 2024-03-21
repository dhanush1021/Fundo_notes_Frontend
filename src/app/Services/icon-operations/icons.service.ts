import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IconsService {
  archive:BehaviorSubject<string> = new BehaviorSubject<string>('Notes')
  archive$=this.archive.asObservable()
  onarchive(bool:string){
    this.archive.next(bool)
  }
}
