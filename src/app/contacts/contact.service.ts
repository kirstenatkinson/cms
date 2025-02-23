import {EventEmitter, Injectable} from '@angular/core';
import { Subject } from 'rxjs';

import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
   contacts: Contact [] =[];
   private maxContactId: number;
   contactSelectedEvent = new EventEmitter<Contact>();
   contactChangedEvent = new EventEmitter<Contact[]>();
   contactListChanged = new Subject<Contact[]>();
   
   constructor() {
      this.contacts = MOCKCONTACTS;
   }

   getContacts() {
      return this.contacts.slice();
   }

   getContact(id: string): Contact | null {
      for (let contact of this.contacts) {
        if (contact.id === id) {
          return contact;
        }
      }
      return null;
    }

    getMaxId(): number {
      let maxId = 0;

      for (let contact of this.contacts) {
         const currentId = parseInt(contact.id);
         if (currentId > maxId) {
            maxId = currentId;
         }
      }

      return maxId;
   }

    // deleteContact(contact: Contact): void {
    //   if (!contact) return;
    //   const pos = this.contacts.indexOf(contact);
    //   if (pos < 0) return;
    //   this.contacts.splice(pos, 1);
    //   this.contactChangedEvent.emit(this.contacts.slice());
    // }

   addContact(contact: Contact): void {
      if (!contact) {
         return;
      }

      this.maxContactId = this.getMaxId() + 1;
      contact.id = this.maxContactId.toString();

      this.contacts.push(contact);
      const contactsListClone = this.contacts.slice();
      this.contactListChanged.next(contactsListClone);
   }

   updateContact(originalContact: Contact, newContact: Contact): void {
      if (!originalContact || !newContact) { 
          return;
      }
  
      const pos = this.contacts.indexOf(originalContact);
      if (pos < 0) {
          return;
      }
  
      newContact.id = originalContact.id;
      this.contacts[pos] = newContact;
  
      const contactsListClone = this.contacts.slice();
      this.contactListChanged.next(contactsListClone);
  }

  deleteContact(contact: Contact): void {
   if (!contact) {
      return
   }

   const pos = this.contacts.indexOf(contact)
   if (pos < 0) {
      return;
   }

   this.contacts.splice(pos, 1);
   this.contactListChanged.next(this.contacts.slice());
  }
}