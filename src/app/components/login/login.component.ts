import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonPrimaryDirective } from '../../shared/directives/button-primary.directive';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ButtonPrimaryDirective, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  @ViewChild('emailInput') emailElement: ElementRef;
  @ViewChild('passwordInput') passwordElement: ElementRef;
  @ViewChild('submit') submitButton: ElementRef;
  @ViewChild('bg') bg: ElementRef;

  loginForm: FormGroup;

  email: string = '';
  password: string = '';

  isShowing: boolean = false;

  constructor(public router: Router, public auth: AuthService, public renderer: Renderer2) {
    this.emailElement = new ElementRef('');
    this.passwordElement = new ElementRef('');
    this.submitButton = new ElementRef('');
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
    this.bg = new ElementRef('');
  }


  goToLandingPage() {
    this.router.navigate(['/landingpage']);
  }


  resetPassword() {
    this.router.navigate(['/ask-for-reset']);
  }

  /**
   * This method is called when the user clicks the submit button.
   * It checks if the form is valid and if so, it calls the login method.
   */
  async postIfValid() {
    if (this.loginForm.valid) {
      this.email = this.loginForm.controls['email'].value;
      this.password = this.loginForm.controls['password'].value;
      this.login(this.email, this.password);
    } else {
      this.showErrorMessage('Please enter a valid email and password.');
    }
  }


  async login(email: string, password: string) {
    try {
      let response = await this.auth.loginWithEmailAndPassword(email, password);
      if (response.access && response.refresh) {
        this.auth.setAccessToken(response.access);
        this.auth.setRefreshToken(response.refresh);
        this.router.navigate(['dashboard/main']);
      } else {
        this.showErrorMessage('Invalid email or password. Please try again.');
      }
    }
    catch (error) {
      this.showErrorMessage('Invalid email or password. Please try again.');
    }
  }

  /**
   * Reveals the password input field.
   */
  showPassword() {
    this.isShowing = !this.isShowing;
    if (this.isShowing) {
      this.renderer.setAttribute(this.passwordElement?.nativeElement, 'type', 'text');
    } else {
      this.renderer.setAttribute(this.passwordElement?.nativeElement, 'type', 'password');
    }
  }
  

  showErrorMessage(message: string) {
    let el = this.renderer.createElement('div');
    this.renderer.setProperty(el, 'innerText', message);
    this.renderer.addClass(el, 'warning')
    this.renderer.appendChild(this.bg?.nativeElement, el);
    setTimeout(() => {
      this.renderer.addClass(el, 'down');
    }, 2000);
    setTimeout(() => {
      this.renderer.removeChild(this.bg?.nativeElement, el);
    }, 4000);
  }

}
