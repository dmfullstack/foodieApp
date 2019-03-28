import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListByCollectionComponent } from './list-by-collection.component';

describe('ListByCollectionComponent', () => {
  let component: ListByCollectionComponent;
  let fixture: ComponentFixture<ListByCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListByCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListByCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
