import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterColumnComponent } from './center-column.component';

describe('CenterColumnComponent', () => {
  let component: CenterColumnComponent;
  let fixture: ComponentFixture<CenterColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
