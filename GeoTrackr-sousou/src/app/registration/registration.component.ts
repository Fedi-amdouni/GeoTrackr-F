import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  addUserForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      adrMail:  ['',[Validators.required,Validators.email]],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],

      pass: ['',Validators.required],
      rePass: ['',Validators.required],

    })

  }

  submit(){
    console.log(this.addUserForm.value)
  }
  routing(){
    this.router.navigate(["../Login"])
  }

}

