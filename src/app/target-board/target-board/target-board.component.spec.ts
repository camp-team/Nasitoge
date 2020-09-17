import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetBoardComponent } from './target-board.component';

describe('TargetBoardComponent', () => {
  let component: TargetBoardComponent;
  let fixture: ComponentFixture<TargetBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TargetBoardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
