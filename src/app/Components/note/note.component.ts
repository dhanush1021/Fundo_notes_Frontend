import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { EditComponent } from '../edit/edit.component';
import { MatDialog } from '@angular/material/dialog';
import { IconsService } from '../../Services/icon-operations/icons.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
  animations:[
    trigger('smoothTransition', [
      state('container', style({
        width: '18.5vw',
        borderRadius: '1.5vh',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: '1vh',
        boxShadow: '0.1vh 0.1vh 8px black',
        opacity: 1
      })),
      state('container1', style({
        width: '18.5vw',
        borderRadius: '1.5vh',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: '1vh',
        opacity: 1
      })),
      transition('container => container1', animate('300ms ease-in')),
      transition('container1 => container', animate('300ms ease-out'))
    ])
  ]
})
export class NoteComponent {
  @Input() note!:any;
  //text2: string = "Your long text here sdsfd fdsdfsfd dsfsd dsfsdd dsfsdf dsfdsf dfsdsfs dsfsfdd dsfsfd asdfsdf sdfsdf sdfsdfdd                                                                                                                 fggfb                                                                                                                 fggfb                                                                                                                 fggfb                                                                                                                 fggfb                                                                                                                 fggfb                                                                                                                 fggfb                                                                                                                 fggfb                                                                                                                 fggfb                                                                                                                 fggfb                                                                                                                 fggfb                                                                                                                 fggfb                                                                                                                 fggfb                                                                                                                 fggfb                                                                                                                 fggfb                                                                                                                 fggfb";
  text1:string = "Title"
  text2:string="Take your note"
  @ViewChild('textareaRef') textareaRef!: ElementRef;
  @ViewChild('textareaRef1') textareaRef1!: ElementRef;
  color=false
  changecolor(){
    this.color=!this.color
  }
  ngAfterViewInit() {
    this.adjustTextareaHeight();
    console.log(this.note)
  }

  adjustTextareaHeight() {
    const textarea1 = this.textareaRef1.nativeElement;
    const textarea2 = this.textareaRef.nativeElement;
    textarea1.style.height = 'auto';
    textarea1.style.height = textarea1.scrollHeight + 'px';
    textarea2.style.height = 'auto';
    textarea2.style.height = Math.min(textarea2.scrollHeight, window.innerHeight * 0.5) + 'px';
  }
  bool=false
  hovering(bool:boolean){
    this.bool=bool
  }
  constructor(private dialog:MatDialog,private iconservice:IconsService){
  }
  update_note(){
    const dialogbox = this.dialog.open(EditComponent,{
      width:"50vw",
      height:"auto",
      data:this.note
  })
  dialogbox.afterClosed().subscribe((res:any)=>{
    console.log(res)
  })
  }
  
  handleArchiveClick(){
    console.log("button triggered"+this.note.notesId);
  }
}
