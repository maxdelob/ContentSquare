import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from '../../services/config.service';
import { MowerInstruction } from 'src/app/classes/mower-instruction';
import { PositionStart } from 'src/app/classes/position-start';


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

  it('createGrid - should create the grid', () => {
    const service = fixture.debugElement.injector.get(ConfigService);
    spyOn(service, 'getMaxLatLng').and.returnValue([5, 5]);
    component.createGrid();
    expect(component.lines.length).toEqual(6);
    expect(component.cols.length).toEqual(6);
  });

 it('computeY - should return the correct Y', () => {
  const service = fixture.debugElement.injector.get(ConfigService);
  spyOn(service, 'getMaxLatLng').and.returnValue([5, 5]);
  component.createGrid();
  const response = component.computeY(0);
  expect(response).toEqual(5);
 });


 it('createMowns - should call startMownInstruction', () => {
   const instructions = [];
   instructions.push(new MowerInstruction(new PositionStart(1, 1, 'N'), ['N', 'S']));
   const service = fixture.debugElement.injector.get(ConfigService);
   spyOn(service, 'getMowerInstructions').and.returnValue(instructions);
   const spyOnMock = spyOn(component, 'startMownInstruction');
   component.createMowns();
   expect(component.mowerInstructions.length).toEqual(1);
   expect(spyOnMock).toHaveBeenCalled();
 });

 it('startMownInstruction -  should call executeInstruction', () => {
  const instruction = new MowerInstruction(new PositionStart(1, 1, 'N'), ['N', 'S']);
  const spyOnMock = spyOn(component, 'executeInstruction');
  component.startMownInstruction(instruction);
  expect(spyOnMock).toHaveBeenCalled();
});

it('executeInstruction  - should call mowerRotate and mowerMove', () => {
  const spyOnMockRotate = spyOn(component, 'mowerRotate');
  const spyOnMockMove = spyOn(component, 'mowerMove');
  component.executeInstruction('R');
  component.executeInstruction('L');
  expect(spyOnMockRotate).toHaveBeenCalledTimes(2);
  component.executeInstruction('F');
  expect(spyOnMockMove).toHaveBeenCalled();
});

it('mowerRotate  - should return the correct rotation values', () => {
  const instruction = new MowerInstruction(new PositionStart(1, 1, 'N'), ['N', 'S']);
  component.startMownInstruction(instruction);
  expect(component.mowerPosition.x).toEqual(1);
  component.mowerRotate('R');
  expect(component.mowerPosition.direction).toEqual('E');
  component.mowerRotate('R');
  expect(component.mowerPosition.direction).toEqual('S');
  component.mowerRotate('R');
  expect(component.mowerPosition.direction).toEqual('W');
  component.mowerRotate('R');
  expect(component.mowerPosition.direction).toEqual('N');

  const instruction2 = new MowerInstruction(new PositionStart(1, 1, 'W'), ['N', 'S']);
  component.startMownInstruction(instruction2);
  component.mowerRotate('L');
  expect(component.mowerPosition.direction).toEqual('S');
  component.mowerRotate('L');
  expect(component.mowerPosition.direction).toEqual('E');
  component.mowerRotate('L');
  expect(component.mowerPosition.direction).toEqual('N');
  component.mowerRotate('L');
  expect(component.mowerPosition.direction).toEqual('W');

});

it('mowerMove  - should behave correctly', () => {
  const service = fixture.debugElement.injector.get(ConfigService);
  spyOn(service, 'getMaxLatLng').and.returnValue([5, 5]);
  component.createGrid(); // set maxX and maxY
  const instruction = new MowerInstruction(new PositionStart(1, 1, 'N'), ['N', 'S']);
  component.startMownInstruction(instruction);
  component.mowerMove();
  expect(component.mowerPosition.y).toEqual(2);
  component.mowerMove();
  component.mowerMove();
  component.mowerMove();
  component.mowerMove(); // 6th time
  expect(component.mowerPosition.y).toEqual(5);

  const instruction2 = new MowerInstruction(new PositionStart(1, 1, 'S'), ['N', 'S']);
  component.startMownInstruction(instruction2);
  component.mowerMove();
  expect(component.mowerPosition.y).toEqual(0);
  component.mowerMove();
  expect(component.mowerPosition.y).toEqual(0);

  const instruction3 = new MowerInstruction(new PositionStart(1, 1, 'E'), ['N', 'S']);
  component.startMownInstruction(instruction3);
  component.mowerMove();
  expect(component.mowerPosition.x).toEqual(2);
  component.mowerMove();
  component.mowerMove();
  component.mowerMove();
  component.mowerMove(); // 6th time
  expect(component.mowerPosition.x).toEqual(5);

  const instruction4 = new MowerInstruction(new PositionStart(1, 1, 'W'), ['N', 'S']);
  component.startMownInstruction(instruction4);
  component.mowerMove();
  expect(component.mowerPosition.x).toEqual(0);
  component.mowerMove();
  expect(component.mowerPosition.x).toEqual(0);

});





});
