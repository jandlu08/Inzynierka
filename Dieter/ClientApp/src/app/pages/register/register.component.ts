import {Component, OnInit} from '@angular/core';
import {RegisterUserGQL, RegisterUserInput, Sex} from '../../../generated/graphql';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  sexTypes = {male: Sex.Male, female: Sex.Female};

  user: RegisterUserInput;
  password: string;
  confirmPassword: string;


  constructor(private router: Router,
              private registerUserGQL: RegisterUserGQL,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.user = {
      sex: Sex.Male,
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
    }
  }

  back() {
    this.router.navigateByUrl('/login');
  }

  register() {
   if(this.password != this.confirmPassword){
     this.snackBar.open("Passwords should be the same.",
       "OK", {duration: 3000});
   }
   else{
     this.registerUserGQL.mutate({user:this.user,password:this.password})
       .subscribe(result => {
         if (result.data.registerUser.userId != null){
           this.router.navigateByUrl('/login');
         }
         else{
           this.snackBar.open("An error occured.",
             "OK", {duration: 3000});
         }
       })
   }
  }


}
