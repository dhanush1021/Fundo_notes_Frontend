import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ValidatorService } from '../../Services/passwordvalidator/validator.service';
import { UserService } from '../../Services/User/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit
{
  pass:string =''
onKey(event: any) {
  this.pass = event.target.value
}
constructor(private userservice:UserService,private route:Router){}
RegSubmit(){
  if(this.reactiveform.valid){
    let reqData={
      firstname:this.reactiveform.value.name,
      lastname:this.reactiveform.value.name1,
      email:this.reactiveform.value.email,
      Password:this.reactiveform.value.password
    }
    this.userservice.register(reqData).subscribe((res:any)=>{
      console.log(res);
      this.route.navigateByUrl("login");
    },(error:any)=>{
      console.log(error)
    })
  }
  else{console.log("Invalid Inputs")}
}
hide = true
reactiveform! : FormGroup
ngOnInit(): void {
  this.reactiveform = new FormGroup({
    name : new FormControl('',[Validators.required]),
    name1 : new FormControl('',[Validators.required]),
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required,Validators.minLength(4),ValidatorService.patternvalidator(this.uppercasePattern,{hasCapitalcase:true}),ValidatorService.patternvalidator(this.lowercasePattern,{hasLowercase:true}),ValidatorService.patternvalidator(this.digitPattern,{hasdigit:true}),ValidatorService.patternvalidator(this.specialCharPattern,{hasspecial:true})]),
    confirmPassword : new FormControl('',[Validators.required,this.passwordmismatch()])
    })
  }
  get name(){
    return this.reactiveform.get('name')
  }
  get name1(){
    return this.reactiveform.get('name1')
  }
  get email(){
    return this.reactiveform.get('email')
  }
  get password(){
    return this.reactiveform.get('password')
  }
  get confirmpassword(){
    return this.reactiveform.get('confirmPassword')
  }

  uppercasePattern = new RegExp('[A-Z]');
  lowercasePattern = new RegExp('[a-z]');
  digitPattern = new RegExp('\\d');
  specialCharPattern = new RegExp('[@$!%*?&]');
  passwordmismatch() : ValidatorFn{
    return (control : AbstractControl) : {[key:string] : boolean} | null =>{
      if(control.value!==this.pass){
        return {passwordmismatched : true}
      }
      return null
    }
  }
}