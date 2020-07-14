import { Component, OnInit, Input } from '@angular/core';
import { Target, TargetWithAuthor } from 'src/app/interfaces/target';
import { TargetService } from 'src/app/services/target.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss'],
})
export class TargetComponent implements OnInit {
  target$: Observable<TargetWithAuthor> = this.route.paramMap.pipe(
    switchMap((paramMap) => {
      const id = paramMap.get('targetId');
      return this.targetService.getTargetsWithAuthorsByTargetId(id);
    })
  );

  constructor(
    private targetService: TargetService,
    private taskService: TaskService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
}
