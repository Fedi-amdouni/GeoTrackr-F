import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize , tap } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';
import {User} from "../../models/User";
import Swal from "sweetalert2";

import {
  SocialAuthService,
  FacebookLoginProvider,
  SocialUser, SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name:String='';
  prenom:String='';
  loginForm!: FormGroup;
  submitted = false;
  error = '';
  loadingLogin = false;
  isLoading = false;
  socialUser!: SocialUser;
  isLoggedin?: boolean = undefined;
  private facebookAppId = '101357639726844';
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private authenticationService : AuthenticationService,
    private socialAuthService: SocialAuthService



  ) { }

  ngOnInit(): void {


    this.loginForm = this.formBuilder.group({
      email:  ['',[Validators.required,Validators.email]],
      password: ['',Validators.required],
    })
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
    });

  }
  onSubmit() {

    this.submitted = true;
    this.loadingLogin = true;
    console.log(this.loginForm.value)
    this.authenticationService
      .login(this.loginForm.value)
      .subscribe({
        next: (data: User) => {
          this.name=this.authenticationService.myName();
          this.prenom=this.authenticationService.myPrenom();

          Swal.fire({
            icon: 'success',
            text: `Soyez les bienvenus ${this.name} ${this.prenom} `,
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/Home/Dachboard']);
        },
        error: (error) =>{
          Swal.fire({
            icon: 'error',
            text: `Connexion impossible`,
            showConfirmButton: false,
            timer: 1500
          });
          console.log('Login failed',error);

        }
      });


  }
  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  signOut(): void {
    this.socialAuthService.signOut();
  }



}
