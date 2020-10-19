import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-propertie-card',
  templateUrl: './propertie-card.component.html',
  styleUrls: ['./propertie-card.component.scss']
})
export class PropertieCardComponent implements OnInit {

  @Input() title;
  @Input() content;
  @Input() price;
  @Input() src;

  constructor() { }

  ngOnInit(): void {
  }

}
