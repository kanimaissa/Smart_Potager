import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotagerComponent } from './potager.component';

describe('PotagerComponent', () => {
  let component: PotagerComponent;
  let fixture: ComponentFixture<PotagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
