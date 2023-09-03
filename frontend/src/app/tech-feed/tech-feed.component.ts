import { Component, OnInit } from '@angular/core';
import * as xml2js from "xml2js";
import { RSSFeed } from "./RSSFeed";

@Component({
  selector: 'app-tech-feed',
  templateUrl: './tech-feed.component.html',
  styleUrls: ['./tech-feed.component.css']
})
export class TechFeedComponent implements OnInit {
  feed: Array<RSSFeed> = [];
  urls: Array<string> = [
    'https://techcrunch.com/feed/',
    'https://www.techradar.com/rss',
    'http://localhost:3000/feed',
    'https://www.wired.com/feed/rss'
  ];

  constructor() {
    this.fetch_rss();
  }

  fetch_rss() {
    this.urls.map(url => fetch(url)
    .then(data => data.text())
    .then(feed => {
      let parseString = xml2js.parseString;
      parseString(feed, (err, result: RSSFeed) => {
        console.log(result);
        this.feed.push(result);
      })
    }))
  }

  ngOnInit(): void {
  }

}
