import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPotagerComponent } from './new-potager.component';

describe('NewPotagerComponent', () => {
  let component: NewPotagerComponent;
  let fixture: ComponentFixture<NewPotagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPotagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPotagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
