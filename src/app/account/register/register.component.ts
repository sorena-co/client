import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../security/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: any = {};

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  register() {
    this.authService.register(this.user)
      .subscribe(value => console.log(value));
  }

}
