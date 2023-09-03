import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechFeedComponent } from './tech-feed.component';

describe('TechFeedComponent', () => {
  let component: TechFeedComponent;
  let fixture: ComponentFixture<TechFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechFeedComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
