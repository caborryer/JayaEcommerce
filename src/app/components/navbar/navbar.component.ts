import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService) { }
  login(provider: string) {
    console.log(provider);
    this.authService.login(provider);

  }

  ngOnInit(): void {
  }

}
