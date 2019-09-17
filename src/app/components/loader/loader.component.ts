import { Component, OnInit } from '@angular/core';

import { ConfigService} from '../../services/config.service';
import { Router } from '@angular/router';

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
  }

  parseLogFile(file) {
    let logLines = file.split(';');
    logLines = logLines.filter((line) => line.length > 0); // remove empty value
    if (logLines.length >= 3 && (logLines.length % 2) !== 0) { // At least one instruction and always odd (maxLatLng)
      let parseLogFile = [];
      logLines.forEach(line => {parseLogFile.push(line.split(' ')); }); // array of array
      this.configService.setMaxLatLng(parseLogFile[0]);
      parseLogFile = parseLogFile.filter((line, i) => i > 0); // remove MaxLatLng
      const instructions = [];  // instruction is a combination of start position and mouvements
      for (let i = 0; i < parseLogFile.length; i += 2) {
        instructions.push([parseLogFile[i], parseLogFile[i + 1]]);
      }
      this.configService.setMowerInstructions(instructions);
      this.router.navigate(['./grid']);
    } else {
      this.isLoadedError = true;
    }
  }
}
