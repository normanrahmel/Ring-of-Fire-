import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-data-imprint',
  templateUrl: './data-imprint.component.html',
  styleUrls: ['./data-imprint.component.scss'],
})
export class DataImprintComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}
  /**
   * go back to previous page
   */
  goBack() {
    this.location.back();
  }
}
