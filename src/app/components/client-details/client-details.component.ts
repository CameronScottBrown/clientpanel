import { Component, OnInit } from '@angular/core';

import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client;
  hasBalance: boolean = false; //color changing functionality
  showBalanceUpdateInput: boolean = false; //setting for editing balance


  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    // get id from URL
    this.id = this.route.snapshot.params['id'];
    
    //send the id back to the service, returns observable
    this.clientService.getClient(this.id).subscribe(client => {
      if(client != null){
        if(client.balance > 0){
          this.hasBalance = true; //they are carrying a balance
        }
      }
      this.client = client; //set to the returned client obj
    })

  }

  updateBalance() {
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Balance updated!', {cssClass: 'alert-success', timeout: 4000});
  }

}
