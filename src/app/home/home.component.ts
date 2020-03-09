import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../security/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLogin: boolean;
  constructor(
    private tokenService: TokenStorageService
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogin = true;
    }
  }

}
