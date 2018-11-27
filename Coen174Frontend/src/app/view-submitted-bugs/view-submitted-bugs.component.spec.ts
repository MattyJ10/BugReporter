import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubmittedBugsComponent } from './view-submitted-bugs.component';

describe('ViewSubmittedBugsComponent', () => {
  let component: ViewSubmittedBugsComponent;
  let fixture: ComponentFixture<ViewSubmittedBugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSubmittedBugsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubmittedBugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
