import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../security/auth.service';
import {TokenStorageService} from '../../security/token-storage.service';
import {UserService} from '../../security/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService, private tokenStorage: TokenStorageService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  login() {
    this.authService.login(this.user).subscribe(data => {
      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveUser(data.user);

      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.tokenStorage.signOut();
      this.userService.getUserProfile(data.user.username).subscribe(
        value => console.log(value)
      );
    }, error => this.errorMessage = error.error.message);
    this.isLoginFailed = true;
  }
}
