import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentArticlesComponent } from './current-articles.component';

describe('CurrentArticlesComponent', () => {
  let component: CurrentArticlesComponent;
  let fixture: ComponentFixture<CurrentArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
