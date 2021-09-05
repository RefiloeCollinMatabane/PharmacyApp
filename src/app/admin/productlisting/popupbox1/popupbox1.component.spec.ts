import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Popupbox1Component } from './popupbox1.component';

describe('PopupboxComponent', () => {
  let component: Popupbox1Component;
  let fixture: ComponentFixture<Popupbox1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Popupbox1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Popupbox1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
