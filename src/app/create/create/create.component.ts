
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { TargetService } from 'src/app/services/target.service';
import { Target } from 'src/app/interfaces/target';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})


export class CreateComponent implements OnInit {

  user$ = this.authService.user$;

  form = this.fb.group({
    target: ['', [
      Validators.required,
      Validators.maxLength(50)
    ]],
    targetDate: ['', [
      Validators.required,
    ]]
  });

  constructor(
    private fb: FormBuilder,
    private targetService: TargetService,
    private authService: AuthService,
    ) {
      console.log(this.user$);
    }

 get target(): FormControl {
   return this.form.get('target') as FormControl;
 }

  get targetDate(): FormControl {
    return this.form.get('targetDate') as FormControl;
  }

  ngOnInit(): void {
  }

  createTarget(authorUid: string){
     const value = this.form.value;
     const target: Omit<Target, 'targetId' | 'createdAt'> = {
      authorUid,
      target: value.target,
      targetDate: value.targetDate,
     };
     this.targetService.createTarget(target);
  }
}
