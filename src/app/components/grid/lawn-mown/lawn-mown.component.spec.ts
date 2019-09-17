import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawnMownComponent } from './lawn-mown.component';

describe('LawnMownComponent', () => {
  let component: LawnMownComponent;
  let fixture: ComponentFixture<LawnMownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawnMownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawnMownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
