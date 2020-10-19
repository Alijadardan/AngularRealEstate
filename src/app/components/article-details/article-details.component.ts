import { SearchService } from './../../services/search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {

  incomingArticle;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.incomingArticle = this.searchService.getClickedArticle();
    console.log(this.incomingArticle);
  }

}
