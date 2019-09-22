import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { MowerService } from '../../services/mower.service';
import { MowerInstruction } from '../../classes/mower-instruction';
import { PositionStart } from '../../classes/position-start';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})

export class GridComponent {
  private speed = 500;
  private numLines = 0;
  private numCol = 0;
  public maxX = 0;
  public maxY = 0;
  public lines = [];
  public cols = [];
  public maxHeight = 700;
  public maxWidth = 700;
  public heightLine: number;
  public widthCol: number;
  public mowerPosition: PositionStart;
  public mowerInstructions: MowerInstruction[];

  constructor(private configService: ConfigService, private router: Router, private mowerService: MowerService ) {
    this.createGrid();
    this.computeHeightEachLine();
    this.computeWidthEachCol();
    this.createMowns();

  }

  createGrid() {
    if (this.configService.getMaxLatLng().length !== 2) {
      this.router.navigate(['./']);
    } else {
      this.maxX = this.configService.getMaxLatLng()[0];
      this.numCol = this.maxX + 1;
      this.maxY = this.configService.getMaxLatLng()[1];
      this.numLines = this.maxY  + 1;
      for (let i = 0; i < this.numLines; i++) { this.lines.push(i); }
      for (let i = 0; i < this.numCol; i++) { this.cols.push(i); }
    }
  }
  computeHeightEachLine() {
    this.heightLine =  this.maxHeight / this.numLines;
    if (this.heightLine < 20) { console.log('Warning: too many lines to display. Deacrease the number of lines.');}
  }

  computeWidthEachCol() {
    this.widthCol =  this.maxWidth / this.numLines;
    if (this.widthCol < 20) { console.log('Warning: too many col to display. Deacrease the number of col.');}
  }
  computeY(line) {
    return this.numLines - 1 - line;
  }

  async createMowns() {
    this.mowerInstructions = this.configService.getMowerInstructions();
    let iterator = 0;
    if (this.mowerInstructions) {
      for (const instruction of this.mowerInstructions) {
        iterator++;
        await this.startMownInstruction(instruction);
        this.mowerService.addLastMowerPosition(this.mowerPosition);
        if (this.mowerInstructions.length === iterator) {
          this.router.navigate(['/output']);
        }
      }
    }
  }

  startMownInstruction(mowerInstruction: MowerInstruction){
    return new Promise(async resolve => {
    this.mowerPosition = mowerInstruction.positionStart;
    for (const move of mowerInstruction.instructions ) {
      await this.executeInstruction(move);
    }
    setTimeout(() => resolve(), this.speed);
  });
 }

 executeInstruction(move: string) {
  return new Promise(async resolve => {
    switch (move) {
      case 'R':
        this.mowerRotate('R');
        setTimeout(() => resolve(), this.speed);
        break;
      case 'L':
        this.mowerRotate('L');
        setTimeout(() => resolve(), this.speed);
        break;
      case 'F':
        this.mowerMove();
        setTimeout(() => resolve(), this.speed);
        break;
      default:
        setTimeout(() => resolve(), this.speed);
    }
  });
 }

 mowerRotate(axe) {
   if (axe === 'R') {
    switch (this.mowerPosition.direction) {
      case 'E':
        this.mowerPosition.direction = 'S';
        break;
      case 'S':
        this.mowerPosition.direction = 'W';
        break;
      case 'W':
        this.mowerPosition.direction = 'N';
        break;
      case 'N':
        this.mowerPosition.direction = 'E';
        break;
    }
   } else {
    switch (this.mowerPosition.direction) {
      case 'E':
        this.mowerPosition.direction = 'N';
        break;
      case 'S':
        this.mowerPosition.direction = 'E';
        break;
      case 'W':
        this.mowerPosition.direction = 'S';
        break;
      case 'N':
        this.mowerPosition.direction = 'W';
        break;
    }
  }
 }

 mowerMove() {
  switch (this.mowerPosition.direction) {
    case 'E':
      if (this.mowerPosition.x < this.maxX) { this.mowerPosition.x++; }
      break;
    case 'S':
        if (this.mowerPosition.y > 0) { this.mowerPosition.y--; }
      break;
    case 'W':
      if (this.mowerPosition.x > 0) {this.mowerPosition.x--; }
      break;
    case 'N':
      if (this.mowerPosition.y  < this.maxY) { this.mowerPosition.y++; }
      break;
  }
 }

}
