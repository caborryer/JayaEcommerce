import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomWindowsComponent } from './chatroom-windows.component';

describe('ChatroomWindowsComponent', () => {
  let component: ChatroomWindowsComponent;
  let fixture: ComponentFixture<ChatroomWindowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatroomWindowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomWindowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
