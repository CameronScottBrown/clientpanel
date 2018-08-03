import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnEdit: boolean = true;

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
      this.client = client; //set to the returned client obj (fills the edit form fields)
    });

  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if(!valid){
      //error condition
      this.flashMessage.show('Please fill out the form correctly.', {cssClass: 'alert-danger', timeout: 2500});
    } else {
      //success
      //add client ID (not in the form)
      value.id = this.id;
      //call service method
      this.clientService.updateClient(value);

      //flash
      this.flashMessage.show('Success! Client updated.', { cssClass: 'alert-success', timeout: 2500});

      //redirect to dashboard
      this.router.navigate(['/client/'+this.id]);

    }
  }


}
