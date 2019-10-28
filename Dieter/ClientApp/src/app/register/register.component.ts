import {Component, OnInit} from '@angular/core';
import {RegisterUserGQL, RegisterUserInput, Sex} from '../../generated/graphql';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  sexTypes = { male: Sex.Male, female: Sex.Female};

  user: RegisterUserInput;
  password: string;
  confirmPassword:string;




  constructor(private router: Router,
              private registerUserGQL: RegisterUserGQL) { }

  ngOnInit() {
    this.user ={
      sex:Sex.Male,
      firstName: '',
      email:'',
      userName:'',
    }
  }

  back() {
    this.router.navigateByUrl('/login');
  }

register(){
    console.warn("dupa")
}


}
