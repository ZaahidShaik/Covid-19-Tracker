import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkBtnComponent } from './bookmark-btn.component';

describe('BookmarkBtnComponent', () => {
  let component: BookmarkBtnComponent;
  let fixture: ComponentFixture<BookmarkBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookmarkBtnComponent]
    });
    fixture = TestBed.createComponent(BookmarkBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
