import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBrouillonsComponent } from './list-brouillons.component';

describe('ListBrouillonsComponent', () => {
  let component: ListBrouillonsComponent;
  let fixture: ComponentFixture<ListBrouillonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBrouillonsComponent]
    });
    fixture = TestBed.createComponent(ListBrouillonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
