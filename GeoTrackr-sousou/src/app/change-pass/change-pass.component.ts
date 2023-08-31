import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {PasswordResetRequest} from "../../models/PasswordResetRequest";
import Swal from "sweetalert2";


@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent {

  resetForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router:Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.resetForm = this.formBuilder.group({
      newPass: ['', [Validators.required, Validators.email]]
    });
  }
  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const resetToken = params.get('token');
      // Now you can use the 'resetToken' query parameter in your component logic
      console.log('Reset Token:', resetToken);
      // You can use the resetToken to identify the user for password reset
    });
  }

  resetPassword(){
    const email = this.resetForm.get('email')?.value;
    console.log(email);
    this.authenticationService.resetPassword(email).subscribe(
      (data:any)=>{
        console.log('Password reset email sent successfully!');
      }

    )
  }

  changePassword(){
    const newPass = this.resetForm.get('newPass')?.value;
   const token=localStorage.getItem("resetToken");
    const requestData: PasswordResetRequest = {
      email: '', // You should set the email value here
      resetToken: token ? token : '',
      newPass: newPass
    };
    this.authenticationService.changePass(requestData).subscribe(
      (response:any)=>{
        Swal.fire({
          icon: 'success',
          title: 'Mot de passe changé avec succés',
          showConfirmButton: false,
          timer: 2500
        });
        this.router.navigate([""])
      console.log("MOT de passe changé");
      localStorage.clear();
      }
    );
  }

}
