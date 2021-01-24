import { async, TestBed } from '@angular/core/testing';
import { LibModule } from './lib.module';

describe('LibModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LibModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LibModule).toBeDefined();
  });
});
