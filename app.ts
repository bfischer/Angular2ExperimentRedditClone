/// <reference path="typings/angular2/angular2.d.ts" />

import {
	Component,
	NgFor,
	View,
	bootstrap
} from "angular2/angular2";


class Article {
	title: string;
	link: string;
	votes: number;
	
	constructor(title, link)
	{
		this.title = title;
		this.link = link;
		this.votes = 0;
	}
	
	voteUp() {
		this.votes +=1;
		return false;
	}
	
	voteDown() {
		this.votes -=1
		return false;
	}
	
	domain() {
		// var link = this.link.split('//')[1];
		// return link.split('/')[0];
		return this.link;
	}
}

@Component({
	selector: 'reddit-article',
	properties: ['article'],
})

@View({
	template: `
		<article>
			<div class="votes">{{ article.votes }}</div>
			<div class="main">
				<h2>
					<a href="{{ article.link }}">{{ article.title }}</a>
					<span>({{ article.domain() }})</span>
				</h2>
				<ul>
					<li><a href (click)='article.voteUp()'>Upvote</a></li>
					<li><a href (click)='article.voteDown()'>Downvote</a></li>
				</ul>
			</div>
		</article>
	`
})

class RedditArticle {
	article: Article;
}

@Component({
	selector: 'reddit'
})

@View({
	template: `
		<section class="new-link">
			<div class="control-group">
				<div><label for="title">Title:</label></div>
				<div><input name="title" #newtitle></div>
			</div>
			<div class="control-group">
				<div><label for="link">Link:</label></div>
				<div><input name="link" #newlink></div>
			</div>
			
			<button (click)="addArticle(newtitle, newlink)">Submit Link</button>
		</section>
		
		<reddit-article
			*ng-for="#article of articles" 
			[article]="article">
		</reddit-article>
	`,
	directives: [RedditArticle, NgFor]
	
})

class RedditApp {
	articles: Array<Article>;
	
	constructor() {
		this.articles = [new Article('Testing 1', 'http://www.google.com'), new Article('Testing 2', 'http://www.google.com')];
	}
	
	addArticle(title, link){
		this.articles.push(new Article(title.value, link.value));
	}
}

bootstrap(RedditApp);