import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bnf',
  templateUrl: './bnf.component.html',
  styleUrls: ['./bnf.component.css']
})
export class BnfComponent implements OnInit {

  pdfSrc = "./assets/BNF.pdf";
  constructor() { }

  ngOnInit() {
  }

}



//