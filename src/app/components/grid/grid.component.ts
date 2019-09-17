import { Component, OnInit } from '@angular/core';

const NUM_LINES = 5;
const NUM_COLS = 5;
const MAX_HEIGHT = 700;
const MAX_WIDTH = 700;

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})

export class GridComponent implements OnInit {
  public lines = [];
  public cols = [];
  public maxHeight = MAX_HEIGHT;
  public maxWidth = MAX_WIDTH;
  public heightLine: number;
  public widthCol: number;

  constructor(){}

  ngOnInit() {
    this.createGrid();
    this.computeHeightEachLine();
    this.computeWidthEachCol();
  }

  createGrid() {
    for (let i = 0; i < NUM_LINES; i++) { this.lines.push(i); }
    for (let i = 0; i < NUM_COLS; i++) { this.cols.push(i); }
  }

  computeHeightEachLine() {
    this.heightLine =  MAX_HEIGHT / NUM_LINES;
    this.heightLine = this.heightLine - 1; // border 1px
    if (this.heightLine < 20) { console.log('Warning: too many lines to display. Deacrease the number of lines.');}
  }

  computeWidthEachCol() {
    this.widthCol =  MAX_HEIGHT / NUM_LINES;
    this.widthCol = this.widthCol - 1; // border 1px
    if (this.widthCol < 20) { console.log('Warning: too many col to display. Deacrease the number of col.');}
  }
  computeY(line) {
    return NUM_LINES - 1 - line;
  }

}
