import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  
  elements: any

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/').subscribe(data => {
      this.elements = data;
    });
    this.http.get('/index').subscribe(data => {
      this.elements = data;
    });
  }

}
