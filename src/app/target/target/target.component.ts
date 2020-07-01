import { Component, OnInit } from '@angular/core';
import { Target } from 'src/app/interfaces/target';
import { TargetService } from 'src/app/services/target.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss'],
})
export class TargetComponent implements OnInit {
  target$: Observable<Target> = this.route.paramMap.pipe(
    // tslint:disable-next-line: no-shadowed-variable
    switchMap((map) => {
      const id = map.get('targetId');
      return this.targetService.getTargetByTargetId(id);
    })
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
