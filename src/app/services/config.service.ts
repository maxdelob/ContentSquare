import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public maxLatLng: number[] = [];
  public MowerInstructions: string[] = [];

  constructor() {}

  setMaxLatLng(val: string[]) {
    if (val.length === 2) {
      val.forEach(coord => {
        this.maxLatLng.push(parseInt(coord)); });
    }
  }

  getMaxLatLng(): number[] { return this.maxLatLng; }


  setMowerInstructions(val: string[]){

  }

}
