import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  contacts: Contact[] = [];

  onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  }
}
