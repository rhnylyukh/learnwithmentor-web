import { Component, OnInit } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Register } from '../../common/models/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  register: Register;
  isLoginError : boolean = false;
  constructor(private userService : UserService, private router : Router) { }

  ngOnInit() {
  }

  OnSubmit(email,password){
     this.userService.userAuthentication(email,password).subscribe((data : any)=>{
      localStorage.setItem('userToken',data.access_token);
      this.router.navigate(['/main-page']);
    },
    (err : HttpErrorResponse)=>{
      this.isLoginError = true;
    });
  }

}
