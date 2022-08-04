import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataImprintComponent } from './data-imprint.component';

describe('DataImprintComponent', () => {
  let component: DataImprintComponent;
  let fixture: ComponentFixture<DataImprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataImprintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataImprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
