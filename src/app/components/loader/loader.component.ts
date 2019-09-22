import { Component, OnInit } from '@angular/core';

import { ConfigService} from '../../services/config.service';
import { Router } from '@angular/router';
import { MowerInstruction } from 'src/app/classes/mower-instruction';
import { PositionStart } from 'src/app/classes/position-start';

const UTF = 'UTF-8';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isLoadedError = false;
  constructor(private configService: ConfigService, private router: Router) {}

  ngOnInit() {}
  openFileLoader(fileInput) {
    const that = this;
    this.isLoadedError = false;
    if (fileInput && fileInput.srcElement && fileInput.srcElement.files) {
      const file = fileInput.srcElement.files[0];
      if (file) {
        const reader: any = new FileReader();
        reader.readAsText(file, UTF);
        reader.onload = function (evt) {
          if ( evt && evt.target && evt.target.result) {
            that.parseLogFile(evt.target.result);
          }
        },
        reader.onerror = function (evt) { that.isLoadedError = true; };
      }
    } else {
      that.isLoadedError = true;
    }
  }

  parseLogFile(file) {
    let logLines = file.split(';');
    logLines = logLines.filter((line) => line.length > 0); // remove empty value
    if (logLines.length >= 3 && (logLines.length % 2) !== 0) { // At least one instruction and always odd (maxLatLng)
      this.configService.setMaxLatLng(logLines[0].split(' '));
      const parseLogFile = logLines.filter((line, i) => i > 0); // remove MaxLatLng
      const mowerInstructions: MowerInstruction[] = [];  // instruction is a combination of start position and mouvements
      for (let i = 0; i < parseLogFile.length; i += 2) {
        const parsedStartPosition = parseLogFile[i].split(' ');
        const position = new PositionStart(parsedStartPosition[0], parsedStartPosition[1], parsedStartPosition[2]);
        const instructions = parseLogFile[i + 1].split('');
        const parsedInstructions = instructions.filter((inst, i) => i > 0); // remove first empty instruction
        mowerInstructions.push(new MowerInstruction(position, parsedInstructions));
       }
     this.configService.setMowerInstructions(mowerInstructions);
      this.router.navigate(['./grid']);
    } else {
      this.isLoadedError = true;
    }
  }
}
