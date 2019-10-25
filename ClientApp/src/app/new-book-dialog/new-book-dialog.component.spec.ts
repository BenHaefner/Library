import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBookDialogComponent } from './new-book-dialog.component';

describe('NewBookDialogComponent', () => {
  let component: NewBookDialogComponent;
  let fixture: ComponentFixture<NewBookDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBookDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
