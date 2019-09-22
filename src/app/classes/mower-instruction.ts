import { PositionStart } from './position-start';

export class MowerInstruction {
    constructor(public positionStart: PositionStart, public instructions: string[]) {}
}
