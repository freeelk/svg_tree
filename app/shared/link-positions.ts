import { Shape } from './shape';

export class LinkPosition {
    x: number;
    y: number;
    
    constructor(x: number, y:number) {
        this.x =x;
        this.y = y;
    }
}

export class LinkPositions {
    id: string;
    top: LinkPosition;
    bottom: LinkPosition;
    left: LinkPosition;
    right: LinkPosition;

    constructor(id: string, x: number, y: number, width: number, height: number) {
        this.id = id;
        this.top = this.getTopPosition(x, y, width, height);
        this.bottom = this.getBottomPosition(x, y, width, height);
        this.left = this.getLeftPosition(x, y, width, height);
        this.right =  this.getRightPosition(x, y, width, height);
    }

    getTopPosition(x: number, y: number, width, height): LinkPosition {
        return new LinkPosition(Math.round(x + width / 2), y);
    }

    getBottomPosition(x: number, y: number, width, height): LinkPosition {
        return new LinkPosition(Math.round(x +width / 2), y + height);
    }

    getLeftPosition(x: number, y: number, width, height): LinkPosition {
        return new LinkPosition(x, Math.round(y + height / 2));
    }

    getRightPosition(x: number, y: number, width, height): LinkPosition {
        return new LinkPosition(x + width, Math.round(y + height / 2));
    }

}
