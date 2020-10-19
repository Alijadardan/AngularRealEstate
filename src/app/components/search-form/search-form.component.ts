import { SearchService } from './../../services/search.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LabelType, Options } from 'ng5-slider';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  @Output() searchResults = new EventEmitter<any>();
  searchForm: FormGroup;
  citys: string[] = ['gjakove', 'prishtine', 'mitrovice', 'peje', 'prizren', 'gjilan', 'ferizaj'];
  statuses: string[] = ['rent', 'sale', 'both'];
  types: string[] = ['1+1', '2+1', '3+1', '3+2', '4+1', '4+2', '5+1'];
  badrooms: string[] = ['1', '2', '3', '4', '5', 'More than 5'];
  bathrooms: string[] = ['1', '2', '3', 'More than 3'];
  finalMaxValuePrice;
  finalMinValuePrice;
  finalMaxValueMeter;
  finalMinValueMeter;
  minValuePrice: number = 0;
  maxValuePrice: number = 75000;
  optionsPrice: Options = {
    floor: 0,
    ceil: 100000,
    step: 5000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low: {
          this.finalMinValuePrice = value;
          return '<b>Price Range:</b> ' + value + " $";
        }
        case LabelType.High: {
          this.finalMaxValuePrice = value;
          return + value + " $";
        }
        default:
          return value + " $";
      }
    }
  };
  minValueMeter: number = 50;
  maxValueMeter: number = 120;
  optionsMeter: Options = {
    floor: 0,
    ceil: 200,
    step: 10,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low: {
          this.finalMinValueMeter = value;
          return '<b>Square Meter:</b> ' + value;
        }
        case LabelType.High: {
          this.finalMaxValueMeter = value;
          return value + '';
        }
        default:
          return " ";
      }
    }
  };

  constructor(private formBuilder: FormBuilder,
    private searchService: SearchService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit() {
    this.searchForm.value.price_from = this.minValuePrice;
    this.searchForm.value.price_to = this.maxValuePrice;
    this.searchForm.value.minMeter = this.minValueMeter;
    this.searchForm.value.maxMeter = this.maxValueMeter;
    // this.searchForm.value.page = 1;
    this.romoveEmpty(this.searchForm.value);
    this.searchService.searchParam(this.searchForm.value).subscribe((data) => {
      this.searchResults.emit(data['Articles'].data);
    });
  }

  buildForm() {
    this.searchForm = this.formBuilder.group({
      city: [''],
      status: [''],
      type: [''],
      keyword: [''],
      bedroom: [''],
      bathroom: ['']
    });
  }


  get form() {
    return this.searchForm.controls;
  }


  romoveEmpty(obj){
    Object.keys(obj).forEach(element => {
      if(obj[element] === ""){
        delete obj[element];
      }
    });
  }
}
