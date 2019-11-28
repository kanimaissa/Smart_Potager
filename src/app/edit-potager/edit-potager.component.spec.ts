import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPotagerComponent } from './edit-potager.component';

describe('EditPotagerComponent', () => {
  let component: EditPotagerComponent;
  let fixture: ComponentFixture<EditPotagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPotagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPotagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
