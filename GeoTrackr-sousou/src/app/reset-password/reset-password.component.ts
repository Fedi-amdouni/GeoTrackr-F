import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {error} from "jquery";
import {User} from "../../models/User";
import { ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  user:any
  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }



  resetPassword(){
    const email = this.resetForm.get('email')?.value;
    console.log(email);
     this.authenticationService.getUserByEmail(email).subscribe(
       (data:any)=>{
         this.user=data;
         console.log(this.user["resetToken"]);
         this.route.paramMap.subscribe(params => {
           const resetToken = params.get(this.user["resetToken"]);
           localStorage.setItem("resetToken",this.user["resetToken"]);
           // Now you can use the 'resetToken' parameter in your component logic
           console.log('Reset Token:', resetToken);
         });
       }
     );

    this.authenticationService.resetPassword(email).subscribe(
      (data:any)=>{
        Swal.fire({
          icon: 'success',
          title: 'Email a été envoyé à votre adresse mail',
          showConfirmButton: false,
          timer: 3500
        });
        location.reload();

        localStorage.setItem("resetMail",email);
        console.log('Password reset email sent successfully!');
      }

    )

  }

}
