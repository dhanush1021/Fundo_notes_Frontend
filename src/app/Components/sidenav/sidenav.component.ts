import { Component, OnDestroy } from '@angular/core';
import { DatasendingService } from '../../Services/data/datasending.service';
import { Subscription } from 'rxjs';
import { IconsService } from '../../Services/icon-operations/icons.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnDestroy {
  sidenavbar: boolean = false;
  temp: boolean = this.sidenavbar;
  sidenavbarhover: boolean = true;
  buttonClicked: boolean = false;

  sidenav() {
    this.sidenavbar = !this.sidenavbar;
    this.temp = this.sidenavbar;
    this.buttonClicked = this.sidenavbar;
  }

  sidenavhover(enter: boolean) {
    if (!this.buttonClicked) {
      if (enter && !this.sidenavbar && this.sidenavbarhover) {
        this.sidenavbar = true;
      } else if (!enter && this.sidenavbar) {
        this.sidenavbar = false;
      }
    }
  }
  icons1:string[]=['lightbulb','notifications']
  icons2:string[]=['label','label']
  icons3:string[]=['edit','archive','delete']
  items1: string[]=['Notes','Reminders']
  items2:string[]=['Edit labels','Archive','Bin']
  items3:string[]=['label1','label2']
  get combinedItems(): string[] {
    return this.items1.concat(this.items3).concat(this.items2);
  }

  get combinedIcons(): string[] {
    return this.icons1.concat(this.icons2).concat(this.icons3);
  }
  private subscription!: Subscription
  constructor(public datareciever:DatasendingService,private iconservice:IconsService) {
    this.initializeBackgroundStates();
    this.subscription = this.datareciever.buttonpressed$.subscribe(()=>{
      this.sidenav()
    })
  }
  backgroundStates!: boolean[];
    initializeBackgroundStates(): void {
    const totalLength = this.items1.length + this.items2.length + this.items3.length;
    this.backgroundStates = Array(totalLength).fill(false);
    this.backgroundStates[0] = true; 
  }
  selected(index: number): void {
    this.backgroundStates.fill(false); 
    this.backgroundStates[index] = true;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe
  }
  isarchive=false
  condition(num:number){
    this.iconservice.onarchive(this.combinedItems[num])
  }
}