import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from '../../services/config.service';


describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridComponent ],
      imports: [RouterTestingModule],
      providers: [ConfigService]


    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the grid', () => {
    const service = fixture.debugElement.injector.get(ConfigService);
    spyOn(service, 'getMaxLatLng').and.returnValue([5, 5]);
    component.createGrid();
    expect(component.lines.length).toEqual(6);
    expect(component.cols.length).toEqual(6);
  });

 it('should return the correct Y', () => {
  const service = fixture.debugElement.injector.get(ConfigService);
  spyOn(service, 'getMaxLatLng').and.returnValue([5, 5]);
  component.createGrid();
  const response = component.computeY(0);
  expect(response).toEqual(5);
 });
});
