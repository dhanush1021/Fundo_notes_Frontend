import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../../Services/notes/note.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-createnote',
  templateUrl: './createnote.component.html',
  styleUrl: './createnote.component.scss'
})
export class CreatenoteComponent implements OnInit {
  noteText: string = '';

  display: boolean = true;

  adjustTextAreaHeight(textarea: HTMLTextAreaElement,containerDiv:HTMLDivElement) {
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight + 2) + 'px';
    this.adjustHeight(textarea,containerDiv)
  }

  adjustHeight(textAreaElement: HTMLTextAreaElement,containerDiv:HTMLDivElement) {
    const textareaHeight = textAreaElement.style.height;
    console.log( 63 * window.innerHeight / 100)
    
    if (parseInt(textareaHeight) > 63 * window.innerHeight / 100) {
      textAreaElement.style.height = '63vh';
      containerDiv.style.height = '80vh';
      textAreaElement.style.overflowY='scroll'
    } else {
      textAreaElement.style.height = textareaHeight + 'px';
      containerDiv.style.height = 'auto';
    }
  }
  reactiveform!:FormGroup
  ngOnInit(): void {
    this.reactiveform = new FormGroup({
      Title : new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required])
  })
  }
  constructor(private notes:NoteService,private dash:DashboardComponent){}
  create(){
    this.display=!this.display
    if(this.reactiveform.valid){
      let reqData={
        Title:this.reactiveform.value.Title,
        Description:this.reactiveform.value.description
      }
      console.log(reqData)
      this.notes.Addnote(reqData).subscribe(res=>{
        console.log(res)
      },
      (error)=>{
        console.log(error)
      })
    }
    this.dash.senddata()
  }
}