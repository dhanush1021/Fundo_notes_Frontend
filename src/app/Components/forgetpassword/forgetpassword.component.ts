import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../Services/User/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent implements OnInit {
  constructor(private userservice:UserService,private route: Router){}
  reactiveform! : FormGroup
  ngOnInit(): void {
    this.reactiveform = new FormGroup({
      email : new FormControl('', [Validators.required, Validators.email])
    })
  }
  RegSubmit(){
    if(this.reactiveform.valid){
      let reqData={
        Email:this.reactiveform.value.email
      }
      console.log(reqData);
      this.userservice.forget(reqData).subscribe((res:any)=>{
        console.log(res);
      },(error:any)=>{
        console.log(error)
      })
    }
    else{console.log("Invalid Inputs")}
  }
  get email(){
    return this.reactiveform.get('email')
  }
}
