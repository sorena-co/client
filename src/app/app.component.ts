import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './security/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLogin: boolean;

  constructor(
    private tokenService: TokenStorageService,
    private router: Router
  ) {

  }

  title = 'gymbrain';

  logout() {
    this.tokenService.signOut();
    window.location.reload();
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogin = true;
    }
  }
}
