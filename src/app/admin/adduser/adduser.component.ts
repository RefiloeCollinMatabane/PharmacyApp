import { Component, OnInit } from '@angular/core';
import { NgForm, Validator } from '@angular/forms';
import { AuthenticationService } from '@app/_services';
interface Role {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  hide = true;

  roles: Role[] = [
    {value: 'Admin-0', viewValue: 'Admin'},
    {value: 'User-1', viewValue: 'User'}
  ];

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {}
  onSignup(form: NgForm) {
    if (form.invalid){
      return;
    }
    this.authService.createUser(form.value.email, form.value.name, form.value.address, form.value.telephone, form.value.role, form.value.password);
    alert('User added successfully!');
    form.resetForm();
  }
}
