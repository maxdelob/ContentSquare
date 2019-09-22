import { Component, OnInit } from '@angular/core';
import { MowerService } from '../../services/mower.service';
import { MowerInstruction } from 'src/app/classes/mower-instruction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit {
  public lastMowerPosition: MowerInstruction[];
  constructor(private mowerService: MowerService,  private router: Router) {
    this.lastMowerPosition = this.mowerService.getLastMowerPosition();

  }

  ngOnInit() {
    if (this.lastMowerPosition.length === 0) { this.router.navigate(['./']); }
  }

}
