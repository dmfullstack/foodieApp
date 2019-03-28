import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListByFavouriteComponent } from './list-by-favourite.component';

describe('ListByFavouriteComponent', () => {
  let component: ListByFavouriteComponent;
  let fixture: ComponentFixture<ListByFavouriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListByFavouriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListByFavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
