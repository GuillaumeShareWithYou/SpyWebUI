import {Injectable} from '@angular/core';
import {User} from '../model/User';
import {ApiService} from './api.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(private api: ApiService, private router: Router) {
  }

  authenticate(username: string, password: string) {

    this.api.login(username, password).subscribe(user => {
      this.connectUser(user);
    });
  }

  logout() {
    console.log('logout');
    this.api.logout().subscribe(e => {
    }, err => {
    }, () => {
      this.closeSession();
    });

  }

  closeSession() {
    this.user = undefined;
    this.router.navigate(['/login'], {queryParams: {'action' : 'logout'}});
  }

  private connectUser(user: User) {
    this.user = user;
    this.router.navigate(['']);
  }

  loginWithCookie() {
    this.api.get<User>('/session/info').subscribe(
      user => {
        this.connectUser(user);
      },
      err => console.log(`Pas de cookie disponibles : ${err}`));
  }
}
