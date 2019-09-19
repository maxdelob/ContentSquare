import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../services/config.service';

const MAX_HEIGHT = 700;
const MAX_WIDTH = 700;

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})

export class GridComponent implements OnInit {
  private numLines = 0;
  private numCol = 0;

  public lines = [];
  public cols = [];
  public maxHeight = MAX_HEIGHT;
  public maxWidth = MAX_WIDTH;
  public heightLine: number;
  public widthCol: number;

  constructor(private configService: ConfigService, private router: Router) {}
  ngOnInit() {
    this.createGrid();
    this.computeHeightEachLine();
    this.computeWidthEachCol();

  }

  createGrid() {
    if (this.configService.getMaxLatLng().length !== 2) {
      this.router.navigate(['./']);
    } else {
      this.numCol = this.configService.getMaxLatLng()[0] + 1;
      this.numLines = this.configService.getMaxLatLng()[1] + 1;
      for (let i = 0; i < this.numLines; i++) { this.lines.push(i); }
      for (let i = 0; i < this.numCol; i++) { this.cols.push(i); }
    }
  }
  computeHeightEachLine() {
    this.heightLine =  this.maxHeight / this.numLines;
    this.heightLine = this.heightLine - 1; // border 1px
    if (this.heightLine < 20) { console.log('Warning: too many lines to display. Deacrease the number of lines.');}
  }

  computeWidthEachCol() {
    this.widthCol =  this.maxHeight / this.numLines;
    this.widthCol = this.widthCol - 1; // border 1px
    if (this.widthCol < 20) { console.log('Warning: too many col to display. Deacrease the number of col.');}
  }
  computeY(line) {
    return this.numLines - 1 - line;
  }
}
