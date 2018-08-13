import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Client } from '../../models/Client';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;

  canRegister: boolean;


  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {

    this.canRegister = this.settingsService.getSettings().allowRegistration;

    this.authService.getAuth().subscribe(auth => {
      if(auth){
        //user is logged in
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        //not logged in
        this.isLoggedIn = false;
      }
    });
  }


  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('You are now logged out.', { cssClass: 'alert-success', timeout: 2500});

    //reroute to login page
    this.router.navigate(['/login']);
  }

}
