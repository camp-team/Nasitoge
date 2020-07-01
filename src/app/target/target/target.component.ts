import { Component, OnInit } from '@angular/core';
import { Target } from 'src/app/interfaces/target';
import { TargetService } from 'src/app/services/target.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss'],
})
export class TargetComponent implements OnInit {
  target$: Observable<Target>;

  targets$: Observable<Target> = this.targetService.getTargetByAuthorId(
    this.authService.uid
  );

  constructor(
    private targetService: TargetService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    route.paramMap.subscribe((params) => {
      this.target$ = this.targetService.getTargetByTargetId(
        params.get('targetId')
      );
    });
  }

  ngOnInit(): void {}
}
