import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFacebook, faTwitter, faInstagram,faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component'
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{  NgChartsModule} from 'ng2-charts';

import {
  FacebookLoginProvider,
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { ListTracesComponent } from './list-traces/list-traces.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { ListTrajetsComponent } from './list-trajets/list-trajets.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ListBrouillonsComponent } from './list-brouillons/list-brouillons.component';

const facebookAppId = 101357639726844;
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    ListUsersComponent,
    ListTracesComponent,
    ResetPasswordComponent,
    ChangePassComponent,
    ListTrajetsComponent,
    DashbordComponent,
    ListBrouillonsComponent
  ],
  imports: [

    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    HttpClientModule,
    MatInputModule,
    MatPaginatorModule,
    NgChartsModule,
   
    
    

  ],
  providers: [ {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('101357639726844'),
        },
      ],
    } as SocialAuthServiceConfig,
  },

    ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faFacebook, faTwitter, faInstagram,faGoogle,faEllipsisV);
  }
}
