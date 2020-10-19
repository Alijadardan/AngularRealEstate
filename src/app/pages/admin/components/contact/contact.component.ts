import { ContactAdminService } from './../../../../services/admin/contact-admin.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import ContactUs from 'src/app/shared/models/ContactUs';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Toast } from 'src/app/shared/helpers/Toast';
import {Location} from '@angular/common';

@Component({
  selector: 'admin-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, AfterViewInit {

  contacts: MatTableDataSource<ContactUs>;
  displayedColumns: string[] = ['id', 'name', 'email', 'subject', 'created_at', 'action'];
  expandedElement: ContactUs | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private contactService: ContactAdminService,
    private _location: Location) { }

  ngOnInit(): void {
    if(localStorage.getItem('contactData') && (localStorage.getItem('contactData') == undefined)){
      this.contacts = new MatTableDataSource(JSON.parse(localStorage.getItem('contactData')));
    }else{
      this.getContacts();
    }
  }

  ngAfterViewInit() {
    if(localStorage.getItem('contactData')){
      this.contacts.paginator = this.paginator;
      this.contacts.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.contacts.filter = filterValue.trim().toLowerCase();

    if (this.contacts.paginator) {
      this.contacts.paginator.firstPage();
    }
  }

  getContacts(){
    this.contactService.getContacts().subscribe((data)=>{
        console.log(data);
        if(data && !(data.Message == "Not authorizated")){
          this.contacts = new MatTableDataSource(data['Contact-Us']);
          this.saveLoaclStorage('contactData', data['Contact-Us']);
          this.contacts.paginator = this.paginator;
          this.contacts.sort = this.sort;
        }else {
          Swal.fire({
            text: 'Somthing went wrong :' + data.Message,
            icon: 'error'
          });
          this._location.back();
        }
    });
  }

  deleteContact(id){
    Swal.fire({
      title: 'Are you sure you want to delete this article?',
      showCancelButton: true,
      confirmButtonText: `Delete`,
      cancelButtonText: `Cancel`,
      icon: 'warning'
    }).then((result) => {
      if(result.isConfirmed){
        console.log(this.contacts.data, id);
        let placeholder;
        let index;
        let counter = 0;
        this.contacts = new MatTableDataSource(this.contacts.data.filter(function(obj){
          counter++;
          if (obj.id == id) {
            placeholder =  obj;
            index = --counter;
          }
          return obj.id != id;
        }));
        localStorage.removeItem('contactData');
        this.contacts.paginator = this.paginator;
        this.contacts.sort = this.sort;
        this.contacts._updateChangeSubscription();
        console.log(this.contacts.data, index);
        this.contactService.deleteContact(id).subscribe({
          next: () => {
            Toast.fire({
              icon: 'success',
              title: "Successfully Deleted"
            })
          },
          error: error => {
            console.log(placeholder);
            console.log(this.contacts.data);
            this.contacts.data.splice(index, 0, placeholder);
            this.contacts._updateChangeSubscription();
            console.log(this.contacts.data);
            Swal.fire({
              text: 'Somthing went wrong :' + error,
              icon: 'error'
            });
          }
        });
      }else{
        return;
      }
    })
  }

  saveLoaclStorage(key, data){
    if(!localStorage.getItem(key)){
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

}
