import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerWaitingViewComponent } from './player-waiting-view.component';

describe('PlayerWaitingViewComponent', () => {
  let component: PlayerWaitingViewComponent;
  let fixture: ComponentFixture<PlayerWaitingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerWaitingViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerWaitingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
