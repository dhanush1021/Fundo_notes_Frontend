import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token:any
  constructor(private httpservice:HttpService) { }
  register(reqData:any){
    let header = {
      headers:new HttpHeaders({
        'Content-type':'application/json',
        //'Authorization':'token'
      })
    }
    return this.httpservice.postService('/User/Reg',reqData,false,header)
  }
  login(reqData:any){
    let header ={
      headers : new HttpHeaders({
        'Content-type':'application/json',
        //'Authorization':'token'
      })
    }
    return this.httpservice.postService('/User/log',reqData,false,header)
  }
  forget(reqData:any){
    let header={
      headers : new HttpHeaders({
        'Content-type':'application/',
        //'Authorization':'token'
      })
    }
    return this.httpservice.postService('/User/forget?Email='+reqData.Email,{},false,header)
  }
  reset(reqData:any,token:any){
    let header={
      headers : new HttpHeaders({
        'Content-type':'application/json',
        'Authorization': 'Bearer '+token
      })
    }
    return this.httpservice.postServiceReset('/User/reset',reqData,true,header)
  }
}
