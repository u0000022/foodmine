import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';
import { PasswordMatchValidator } from 'src/app/shared/validators/passord_match_validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  registerForm! : FormGroup
  isSubmitted = false
  returnUrl   = ''

  constructor(
    private formBuilder   : FormBuilder,
    private userService   : UserService,
    private activateRoute : ActivatedRoute,
    private router        : Router
  ) {

  }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group( {
      name     : ['',[Validators.required, Validators.minLength(5)]],
      email    : ['',[Validators.required, Validators.email]],
      password : ['',[Validators.required, Validators.minLength(5)]],
      confirmPassword : ['',[Validators.required ]],
      address  : ['',[Validators.required, Validators.minLength(5)]]
    }, {
      validators : PasswordMatchValidator('password','confirmPassword')
    }
    )
    this.returnUrl = this.activateRoute.snapshot.queryParams.returnUrl

  }

  get fc()  {
    return this.registerForm.controls
  }

  submit() {
    debugger
    this.isSubmitted = true
    console.log("this.registerForm.invalid",this.registerForm.invalid);

    if (this.registerForm.invalid) return

    const fv = this.registerForm.value
    const user : IUserRegister = {
      name : fv.name,
      email : fv.email,
      password : fv.password,
      confirmPassword : fv.confirmPassword,
      address : fv.address
    }
    console.log(user);

    this.userService.register(user).subscribe(_ =>  {
      this.router.navigateByUrl(this.returnUrl)
    })
  }

}
