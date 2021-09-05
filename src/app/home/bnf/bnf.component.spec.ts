import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BnfComponent } from './bnf.component';

describe('BnfComponent', () => {
  let component: BnfComponent;
  let fixture: ComponentFixture<BnfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BnfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BnfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
