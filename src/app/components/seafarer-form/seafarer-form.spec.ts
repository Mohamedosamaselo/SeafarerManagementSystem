import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeafarerForm } from './seafarer-form';

describe('SeafarerForm', () => {
  let component: SeafarerForm;
  let fixture: ComponentFixture<SeafarerForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeafarerForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeafarerForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
