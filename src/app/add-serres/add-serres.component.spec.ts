import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSerresComponent } from './add-serres.component';

describe('AddSerresComponent', () => {
  let component: AddSerresComponent;
  let fixture: ComponentFixture<AddSerresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSerresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSerresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
