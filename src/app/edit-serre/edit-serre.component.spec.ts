import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSerreComponent } from './edit-serre.component';

describe('EditSerreComponent', () => {
  let component: EditSerreComponent;
  let fixture: ComponentFixture<EditSerreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSerreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSerreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
