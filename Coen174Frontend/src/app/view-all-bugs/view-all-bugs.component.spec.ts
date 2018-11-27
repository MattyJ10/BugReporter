import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllBugsComponent } from './view-all-bugs.component';

describe('ViewAllBugsComponent', () => {
  let component: ViewAllBugsComponent;
  let fixture: ComponentFixture<ViewAllBugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllBugsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllBugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
