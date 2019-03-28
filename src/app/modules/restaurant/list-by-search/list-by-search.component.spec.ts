import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBySearchComponent } from './list-by-search.component';

describe('ListBySearchComponent', () => {
  let component: ListBySearchComponent;
  let fixture: ComponentFixture<ListBySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
