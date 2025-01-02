import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { StorageService } from '../service/storage.service';
import { Global } from '../admin/dto/dtos';
import { HttpService } from '../service/http.service';
import { Router } from '@angular/router';

interface CustomJwtPayload {
  tenantType: string;
}

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  tenantType: string | null = null
  // emailEntered:boolean = false
  LogInForm: FormGroup
  // forgetPasswordForm: FormGroup

  constructor(private service: HttpService, private fb: FormBuilder, private localStorage: StorageService, private router:Router) {
    this.LogInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
    // this.forgetPasswordForm = this.fb.group({
    //   loginId:['',Validators.required]
    // })
  }

  onLogIn() {
    if (this.LogInForm.valid) {
      const values = this.LogInForm.value
      this.service.login(values).subscribe(
        (result) => {
          if (result) {
            const decodedToken = jwtDecode<CustomJwtPayload>(result.accessToken)
            // this.tenantType = decodedToken ? decodedToken.tenantType : null
            this.tenantType = decodedToken.tenantType
            this.localStorage.setTenantType('tenant', this.tenantType)
            // this.permissionService.addPermission(this.tenantType)
            // Login successful, handle the result (e.g., set user session, navigate)
            this.checkLogin(result);
            // Example: Set user session and navigate to home page
            // this.authService.setUserSession(result);
            // this.router.navigate(['/admin/dashboard']);
          }
        },
        (error: any) => {
          console.error(error);
          Swal.fire({
            icon: 'warning',
            text: 'Username or password incorrect  An error occurred during login. Please try again.'
          });
        }
      );
    }
  }

  checkLogin(result: any) {
    const localStorage = new StorageService()
    localStorage.setItem(Global.key_token, result.accessToken);
    this.router.navigate(['/admin/assets'])
    // localStorage.setItem(Global.key_refresh_token, result.refreshToken);
    // Navigate based on tenantType
    // if (this.tenantType === 'SUPER_ADMIN') {
    //   this.router.navigate(['/admin/dashboard']);
    // } else if (this.tenantType === 'ADMIN') {
    //   this.router.navigate(['/admin/bc_dashboard']);
    // } 
    // else {
    //   // Handle other tenant types or default navigation
    //   this.router.navigate(['/default/dashboard']);
    // }

    // this.localStorage.setItem(Global.key_firstName, result.loginData.firstName.en);
    // this.localStorage.setItem(Global.key_loginId, result.loginData.loginId);
    // this.localStorage.setItem(Global.key_role, result.loginData.role.en);

    // setTimeout(() => {
    //   let redirectUrl = 'home';
    //   this.router.navigate(['/admin/home']); 
    //   this.router.navigateByUrl(redirectUrl).then(() => {
    //     // this.toastr.success("Login successfully");
    //   });
    // }, 0);
  }

  // forgetPassword(){
  //   // this.spinner.show()
  //   this.service.post('auth/forget_password',this.forgetPasswordForm.value).subscribe((data)=>{
  //     // this.spinner.hide()
  //     Swal.fire({
  //       text: 'Check email to reset password'
  //     });     
  //   },(error: any) => {
  //     //this.spinner.hide()
  //     console.error(error);
  //     // Handle error (e.g., display a message to the user)
  //     Swal.fire({
  //       icon:'warning',
  //       text: 'Username or email incorrect  An error occurred during sending email. Please try again.'
  //     });
  //   })
  // }

}
