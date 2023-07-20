import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaMaterialComponent } from './carga-material.component';

describe('CargaMaterialComponent', () => {
  let component: CargaMaterialComponent;
  let fixture: ComponentFixture<CargaMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
