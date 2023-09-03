import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllBlogsComponent } from './show-all-blogs.component';

describe('ShowAllBlogsComponent', () => {
  let component: ShowAllBlogsComponent;
  let fixture: ComponentFixture<ShowAllBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllBlogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
