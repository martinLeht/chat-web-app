import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsComponentComponent } from './groups-component.component';

describe('GroupsComponentComponent', () => {
  let component: GroupsComponentComponent;
  let fixture: ComponentFixture<GroupsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
