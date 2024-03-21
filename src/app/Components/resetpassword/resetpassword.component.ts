import { Component } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn, Validators,FormControl } from '@angular/forms';
import { ValidatorService } from '../../Services/passwordvalidator/validator.service';
import { UserService } from '../../Services/User/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss'
})
export class ResetpasswordComponent {
  hide = true
  token:any;
  pass:string =''
  onKey(event: any) {
    this.pass = event.target.value
  }
  reactiveform! : FormGroup
  ngOnInit(): void 
  {
    this.reactiveform = new FormGroup({
    password : new FormControl('',[Validators.required,Validators.minLength(4),ValidatorService.patternvalidator(this.uppercasePattern,{hasCapitalcase:true}),ValidatorService.patternvalidator(this.lowercasePattern,{hasLowercase:true}),ValidatorService.patternvalidator(this.digitPattern,{hasdigit:true}),ValidatorService.patternvalidator(this.specialCharPattern,{hasspecial:true})]),
    confirmPassword : new FormControl('',[Validators.required,this.passwordmismatch()])
    })
  }
  get password(){
    return this.reactiveform.get('password')
  }
  get confirmpassword(){
    return this.reactiveform.get('confirmPassword')
  }
  onsubmit(){
    if(this.reactiveform.valid){
      let reqData={
        new_password:this.reactiveform.value.password,
        confirm_password:this.reactiveform.value.confirmPassword
      }
      console.log(reqData)
      this.userservice.reset(reqData,this.token).subscribe((res:any)=>{
        console.log(res)
      },
      (error:any)=>{
        console.log(error)
      })
    }
  }
  constructor(private userservice:UserService,private route:Router,private active:ActivatedRoute){
    this.token=this.active.snapshot.paramMap.get('token')
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
