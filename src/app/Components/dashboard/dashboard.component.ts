import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { DatasendingService } from '../../Services/data/datasending.service';
import { NoteService } from '../../Services/notes/note.service';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';
import { IconsService } from '../../Services/icon-operations/icons.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  selectednote:number=-1
  changecolor(num:number){
    this.selectednote=num
  }
bool=false
hovering(bool:boolean){
  this.bool=bool
}

  change=false
  notesarray:any
  onchange() {
    this.change=!this.change
  }
  sidenavbar:boolean = false
  constructor(private datasend:DatasendingService,private notes: NoteService,private dialog:MatDialog,private iconservice:IconsService){
    this.iconservice.archive$.subscribe((bool)=>{
      if(bool==='Archive'){
        this.isarchive=true
        this.isnotes=false
        this.istrash=false
        this.senddata1()
      }
      else if(bool==='Bin'){
        this.isarchive=false
        this.isnotes=false
        this.istrash=true
        this.senddata2()
      }
      else{
        this.isarchive=false
        this.isnotes=true
        this.istrash=false
        this.senddata()
      }
    })
  }

  onsidenav(){
    this.datasend.triggeredbuttinpressed()
    this.sidenavbar=!this.sidenavbar
  }
  ngOnInit(): void {
    this.senddata()
    this.isnotes=true
  }
  senddata(){
    this.notes.getnotes().subscribe((res:any)=>{
      console.log(res)
      this.notesarray=res.data.filter((object:any)=>{
        return object.isArchive===false&&object.isTrash===false
      })
    },
    error=>{
      console.log(error)
    })
    console.log(this.notesarray)
  }
  senddata1(){
    this.notes.getnotes().subscribe((res:any)=>{
      console.log(res)
      this.notesarray=res.data.filter((object:any)=>{
        return object.isArchive===true&&object.isTrash===false
      })
    },
    error=>{
      console.log(error)
    })
    console.log(this.notesarray)
  }
  senddata2(){
    this.notes.getnotes().subscribe((res:any)=>{
      console.log(res)
      this.notesarray=res.data.filter((object:any)=>{
        return object.isArchive===false&&object.isTrash===true
      })
    },
    error=>{
      console.log(error)
    })
    console.log(this.notesarray)
  }
  isarchive=false
  istrash=false
  isnotes!:boolean;
}
