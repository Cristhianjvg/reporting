import { TestBed } from '@angular/core/testing';

import { ReporteActividadesService } from './reporte-actividades.service';

describe('ReporteActividadesService', () => {
  let service: ReporteActividadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteActividadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
