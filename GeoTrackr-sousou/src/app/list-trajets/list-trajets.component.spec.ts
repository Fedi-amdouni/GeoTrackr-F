import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTrajetsComponent } from './list-trajets.component';

describe('ListTrajetsComponent', () => {
  let component: ListTrajetsComponent;
  let fixture: ComponentFixture<ListTrajetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTrajetsComponent]
    });
    fixture = TestBed.createComponent(ListTrajetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
