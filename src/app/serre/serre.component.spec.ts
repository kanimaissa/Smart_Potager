import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerreComponent } from './serre.component';

describe('SerreComponent', () => {
  let component: SerreComponent;
  let fixture: ComponentFixture<SerreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
