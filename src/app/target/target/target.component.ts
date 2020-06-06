import { Component, OnInit } from '@angular/core';
import { Target } from 'src/app/interfaces/target';
import { TargetService } from 'src/app/services/target.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss'],
})
export class TargetComponent implements OnInit {
  targets: Target;

  targets$: Observable<Target> = this.targetService.getTarget(
    this.authService.uid
  );

  constructor(
    private targetService: TargetService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
}
