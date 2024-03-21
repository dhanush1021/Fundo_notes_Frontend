import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseurl = environment.baseurl
  constructor(private httpclient:HttpClient) { }
  postService(url : string, reqdata: any, token: boolean = false,httpOptions:any ={}){
    return this.httpclient.post(this.baseurl+url,reqdata,token && httpOptions)
  }
  postServiceReset(url:string, reqData: any,token :boolean=true,httpOptions: any={}){
    return this.httpclient.post(this.baseurl+url,reqData,token && httpOptions)
  }
  getservice(url:string,token:boolean=true,httpOptions:any ={}){
    return this.httpclient.get(this.baseurl+url,token &&httpOptions)
  }
  putservice(url:string,reqData:any,token:boolean=true,httpOptions:any={}){
    return this.httpclient.put(this.baseurl+url,reqData,token && httpOptions)
  }
}
