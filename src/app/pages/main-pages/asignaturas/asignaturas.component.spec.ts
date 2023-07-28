import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsiganturasComponent } from './asignaturas.component';

describe('AsiganturasComponent', () => {
  let component: AsiganturasComponent;
  let fixture: ComponentFixture<AsiganturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsiganturasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsiganturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
