import { Injectable } from '@angular/core';
import { MowerInstruction } from '../classes/mower-instruction';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public maxLatLng: number[] = [];
  public mowerInstructions: MowerInstruction[] = [];

  constructor() {}

  setMaxLatLng(val: string[]) {
    if (val.length === 2) {
      val.forEach(coord => {
        this.maxLatLng.push(parseInt(coord)); });
    }
  }

  getMaxLatLng(): number[] { return this.maxLatLng; }

  setMowerInstructions(val: MowerInstruction[]){
    this.mowerInstructions = val;
  }

  getMowerInstructions() {
    return this.mowerInstructions;
  }
}
