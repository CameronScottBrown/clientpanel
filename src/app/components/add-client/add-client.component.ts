import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';
import { Client } from '../../models/Client';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0  
  };

  disableBalanceOnAdd: boolean;

  @ViewChild('clientForm') form: any;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}){
    if(this.disableBalanceOnAdd){
      value.balance = 0;
    }

    if(!valid){

      //show error message
      this.flashMessagesService.show('Please fill out the form correctly.', 
      { cssClass: 'alert-danger text-center', timeout: 2500 });

    } else {

      //add new client
      this.clientService.newClient(value);

      //show success message
      this.flashMessagesService.show('Success! New client added.', 
      { cssClass: 'alert-success text-center', timeout: 2500 });

      //redirect to dashboard
      this.router.navigate(['/']);

    }

  }

}
