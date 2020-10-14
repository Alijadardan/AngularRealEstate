import { SearchFormComponent } from './../search-form/search-form.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {

  searchResults;
  empty = false;

  constructor() { }

  ngOnInit(): void {

  }

  receiveResults($event){
    this.searchResults = $event
    if(this.searchResults.length == 0){
      this.empty = true;
    }else {
      this.empty = false;
    }
    console.log(this.searchResults);
  }

}
