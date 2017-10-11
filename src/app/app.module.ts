import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginformComponent } from './loginform/loginform.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from './services/user.service';
import { AuthGuard } from './guards/auth.guard';
import { HttpModule } from '@angular/http';
import { LoginButtonComponent } from './login-button/login-button.component';
import { MenuComponent } from './menu/menu.component';
import { BodyComponent } from './body/body.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ValidatorService } from './services/validator.service';
import { UploadComponent } from './upload/upload.component';
import { NgProgressModule } from 'ngx-progressbar';

const appRoutes: Routes =
[
  {
    path: '',
    // canActivate: [AuthGuard],
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginformComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'upload',
    // canActivate: [AuthGuard],
    component: UploadComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginformComponent,
    FooterComponent,
    DashboardComponent,
    LoginButtonComponent,
    MenuComponent,
    BodyComponent,
    SignUpComponent,
    UploadComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NgProgressModule
  ],
  providers: [UserService, ValidatorService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
