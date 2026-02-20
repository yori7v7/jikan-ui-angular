import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JikanDashboard } from './jikan-dashboard';

describe('JikanDashboard', () => {
  let component: JikanDashboard;
  let fixture: ComponentFixture<JikanDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JikanDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JikanDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
