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
        this.top = new LinkPosition(Math.round(x + width / 2), y);
        this.bottom = new LinkPosition(Math.round(x +width / 2), y + height);
        this.left = new LinkPosition(x, Math.round(y + height / 2));
        this.right =  new LinkPosition(x + width, Math.round(y + height / 2));
    }
}
