import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../Services/User/user.service';
import { Router } from '@angular/router';
import { error } from 'node:console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit
{
  submitted: boolean = false;
LoginSubmit(){
  this.submitted=true;
  if(this.ReactiveForm.valid){
    let reqData={
      email:this.ReactiveForm.value.email,
      Password:this.ReactiveForm.value.password
    }
    this.userservice.login(reqData).subscribe((res:any)=>{
      console.log(res);
      localStorage.setItem("token",res.data);
      this.route.navigateByUrl("home");
    },(error:any)=>{
      console.log(error)
    })
  }
  else{console.log("Invalid Inputs")}
}
  hide = true
  ReactiveForm!: FormGroup
  constructor(private userservice:UserService,private route:Router){}
  ngOnInit(): void {
    this.ReactiveForm = new FormGroup({
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required, Validators.minLength(4)]),
    })
  }
  get email(){
    return this.ReactiveForm.get('email')
  }
  get password(){
    return this.ReactiveForm.get('password')
  }
}
