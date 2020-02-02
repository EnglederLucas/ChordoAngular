import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'link-processor',
  templateUrl: './link-processor.component.html',
  styleUrls: ['./link-processor.component.css']
})
export class LinkProcessorComponent implements OnInit {

  url : string = '';
  constructor() { }

  ngOnInit() {
  }

}
