import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { User } from '../shared/models/User';

const USER_KEY = 'User'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserToLocalStorage())
  public userObsevable : Observable<User>

  constructor(
    private http : HttpClient,
    private toastrService : ToastrService
    ) {
      this.userObsevable = this.userSubject.asObservable()
   }

  login(userLogin : IUserLogin) : Observable<User> {
        return this.http.post<User>(USER_LOGIN_URL,userLogin).pipe(
          tap({
            next: (user : User) =>{
              this.setUserToLocalStorage(user);
              this.userSubject.next(user);
              this.toastrService.success(
                `Welcome to Foodmine ${user.name}!`,
                'Login Successful'
              )
            },
            error: (errorResponse : any) => {
              this.toastrService.error(errorResponse.error, 'Login Failed');
            }
          })
          )
  }

  private setUserToLocalStorage(user : User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  private getUserToLocalStorage() : User  {
    const userJson = localStorage.getItem(USER_KEY)
    if (userJson)
       return JSON.parse(userJson) as User
    return  new User()
  }

  register(userRegister : IUserRegister) : Observable<User> {
      return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
        tap({
          next: (user) => {
          this.setUserToLocalStorage(user)
          this.userSubject.next(user)
          this.toastrService.success(`Welcome to the Foodmain ${user.name}`, `Register Successful`)
        },
        error : (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Register Failed')
        }
       })
      )
  }

  logout() {
    this.userSubject.next(new User())
    localStorage.removeItem(USER_KEY)
    window.location.reload()
  }
}
