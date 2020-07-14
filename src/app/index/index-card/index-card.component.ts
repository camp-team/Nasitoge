import { Component, OnInit, Input } from '@angular/core';
import { TargetWithAuthor } from 'src/app/interfaces/target';

@Component({
  selector: 'app-index-card',
  templateUrl: './index-card.component.html',
  styleUrls: ['./index-card.component.scss'],
})
export class IndexCardComponent implements OnInit {
  @Input() targetWithAuthor: TargetWithAuthor;

  constructor() {}

  ngOnInit(): void {}
}
