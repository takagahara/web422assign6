import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {

  @Input() page;

  @Output() btnClicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  prevPage() {
    if (this.page > 1)
      this.btnClicked.emit(this.page - 1);
  }

  nextPage() {
    this.btnClicked.emit(this.page + 1);
  }

}
