import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form = this.fb.group({
    dream: ['', [
      Validators.required,
      Validators.maxLength(50)
    ]],
    dream_date: ''
  });

  // privateで定義することでこのcomponent内でFBを持つfbが使えるように。
  constructor(
    private fb: FormBuilder
    ) {}

  get dream(): FormControl {
    return this.form.get('dream') as FormControl;
  }

  submit() {
    console.log(this.form.value);
  }

  ngOnInit(): void {
  }

}
