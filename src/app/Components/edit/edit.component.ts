import { Component,Inject,OnInit } from '@angular/core';
import { NoteService } from '../../Services/notes/note.service';import {MatDialog,MAT_DIALOG_DATA,MatDialogRef,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose,} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit{
  // @Output() refreshUpdate = new EventEmitter<string>();
   title:any;
   description:any;
   note_id:any;
 
   constructor(
     @Inject(MAT_DIALOG_DATA) public data:any,
     public dialogbox : MatDialogRef<EditComponent>,
     private notes:NoteService){
       this.title=data.title,
       this.description=data.description,
       this.note_id= data.notesId
     }
   
     create(){
      if(this.reactiveform.valid){
        let reqData={
          NotesId:this.note_id,
          Title:this.title,
          Description:this.description
        }
        console.log(reqData);
        this.notes.updatenote(reqData).subscribe((res:any)=>{
          console.log(res);
          this.dialogbox.close()
        })
      }
     }
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
 }
