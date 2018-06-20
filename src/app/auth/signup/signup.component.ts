import { Component, OnInit } from '@angular/core';
import { Register } from '../../common/models/register';
import { NgForm } from '@angular/forms';
import { UserService } from '../../common/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  register: Register;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.register = {
      Password: '',
      Email: '',
      FirstName: '',
      LastName: ''
    }
  }

  OnSubmit(form: NgForm) {
    
    const data: Register = {
      Password: "1111",
      Email: "user.Email",
      FirstName: "user.FirstName",
      LastName: "user.LastName"
  }
    this.userService.registerUser(data);
  }
}
