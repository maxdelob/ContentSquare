import { Injectable } from '@angular/core';
import { MowerInstruction } from '../classes/mower-instruction';

@Injectable({
  providedIn: 'root'
})
export class MowerService {
  lastMowerPosition: MowerInstruction[] = [];
  constructor() { }
  addLastMowerPosition(mower) {
    this.lastMowerPosition.push(mower);
  }
  getLastMowerPosition() {
    return this.lastMowerPosition;
  }
}
