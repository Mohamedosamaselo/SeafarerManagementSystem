import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeafarerList } from './seafarer-list';

describe('SeafarerList', () => {
  let component: SeafarerList;
  let fixture: ComponentFixture<SeafarerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeafarerList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeafarerList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
