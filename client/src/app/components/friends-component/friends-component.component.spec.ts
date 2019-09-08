import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsComponentComponent } from './friends-component.component';

describe('FriendsComponentComponent', () => {
  let component: FriendsComponentComponent;
  let fixture: ComponentFixture<FriendsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
