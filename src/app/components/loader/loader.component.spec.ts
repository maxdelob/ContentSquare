import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 it('parseLogFile - it should parse with the demo file ', () => {
   const demoFile = `5 5;
   1 2 N;
   LFLFLFLFF;
   3 3 E;
   FFRFFRFRRF;`;
   component.parseLogFile(demoFile);
   expect(component.isLoadedError).toBeFalsy();
 });

 it('parseLogFile - it should throw an error if the log miss a line', () => {
  const demoFile = `5 5;
  1 2 N;
  LFLFLFLFF;
  3 3 E;`;
  component.parseLogFile(demoFile);
  expect(component.isLoadedError).toBeTruthy();
 });

 it('openFileLoader - it should throw and error if the loaded file is null', () => {
   component.openFileLoader(null);
   expect(component.isLoadedError).toBeTruthy();
 });

 it('openFileLoader - it should load the file if the log file fit FileReader format', () => {
  const mock = {'srcElement' : { 'files': [new Blob()]}};
  component.openFileLoader(mock);
  expect(component.isLoadedError).toBeFalsy();
});

});
