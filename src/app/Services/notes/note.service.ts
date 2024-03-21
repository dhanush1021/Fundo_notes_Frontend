import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';
import { LocalService } from '../localstorage/local.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  token:any
  constructor(private httpservice:HttpService,private local :LocalService) {
    this.token = local.getItem('token')
   }
  Addnote(reqData:any){
    let header = {
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'Authorization':'Bearer '+this.token
      })
    }
    return this.httpservice.postServiceReset('/Notes/Add',reqData,true,header)
  }
  getnotes(){
    let header= {
      headers: new HttpHeaders({
        'Content-type':'application/json',
        'Authorization':'Bearer '+this.token
      })
    }
    return this.httpservice.getservice('/Notes/Display',true,header)
  }
  updatenote(reqData:any){
    let header={
      headers: new HttpHeaders({
        'Content-type':'application/json',
        'Authorization':'Bearer '+this.token
      })
    }
    return this.httpservice.putservice('/Notes/Update',reqData,true,header)
  }
  Archievenote(reqData:any){
    let header={
      headers:new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization':'Bearer '+this.token
      })
    }
    return this.httpservice.putservice('/Notes/archive?id='+reqData.notesId,{},true,header)
  }
  DeleteNote(reqData:any){
    let header={
      headers:new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization':'Bearer '+this.token
      })
    }
    return this.httpservice.putservice('/Notes/trash?id='+reqData.notesId,{},true,header)
  }
  AddColor(reqData:any){
    let header={
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'Authorization':'Bearer '+this.token
      })
    }
    return this.httpservice.putservice('/Notes/color?color='+reqData.colour+'&noteid='+reqData.notesId,{},true,header)
  }
}
