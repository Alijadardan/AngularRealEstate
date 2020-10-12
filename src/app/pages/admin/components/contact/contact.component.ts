import { ContactAdminService } from './../../../../services/admin/contact-admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import ContactUs from 'src/app/shared/models/ContactUs';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'admin-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contacts: MatTableDataSource<ContactUs>;
  displayedColumns: string[] = ['id', 'name', 'email', 'subject', 'created_at'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private contactService: ContactAdminService) { }

  ngOnInit(): void {
    this.getContact();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.contacts.filter = filterValue.trim().toLowerCase();

    if (this.contacts.paginator) {
      this.contacts.paginator.firstPage();
    }
  }

  getContact(){
    this.contactService.getContacts().subscribe({
      next: (data) => {
        this.contacts = new MatTableDataSource(data['Contact-Us']);
        console.log(this.contacts);
        this.contacts.paginator = this.paginator;
        this.contacts.sort = this.sort;
      },
      error: error => {
        Swal.fire({
          text: 'Somthing went wrong :' + error,
          icon: 'error'
        });
      }
    });
  }

}
