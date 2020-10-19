import { Router } from '@angular/router';
import { SearchService } from './../../services/search.service';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  @Input() searchResults;
  @Input() empty;

  constructor(private searchService: SearchService,
    private route: Router) { }

  ngOnInit(): void {
  }

  goToArticle(article){
    this.searchService.setCLickedArticleObj(article);
    this.route.navigate(['/article-details']);
  }
}
