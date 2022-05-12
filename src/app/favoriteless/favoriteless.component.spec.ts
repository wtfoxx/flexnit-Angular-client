import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritelessComponent } from './favoriteless.component';

describe('FavoritelessComponent', () => {
  let component: FavoritelessComponent;
  let fixture: ComponentFixture<FavoritelessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritelessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritelessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
