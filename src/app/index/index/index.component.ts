import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TargetService } from 'src/app/services/target.service';
import { TargetWithAuthor } from 'src/app/interfaces/target';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  targetWithAuthor$: Observable<
    TargetWithAuthor[]
  > = this.targetService.getTargetWithAuthor();

  constructor(private targetService: TargetService) {}

  ngOnInit(): void {}
}
