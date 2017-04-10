import { Component, Inject, forwardRef, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { TreeCanvas } from '../tree-canvas.component/tree-canvas.component';
import { Shape } from '../shared/shape';
import { LinkPosition, LinkPositions } from '../shared/link-positions';
import snap = require("snapsvg")

class PositionsFromTo {
    positionFrom: LinkPosition;
    positionTo: LinkPosition;
}

@Component({
    moduleId: module.id,
    selector: 'tree-link',
    templateUrl: 'tree-link.component.html',
    styleUrls: ['tree-link.component.css'],
    inputs: ['id', 'xFrom', 'yFrom', 'xTo', 'yTo', 'shapeFrom', 'shapeTo'],
    outputs: ['select']
})
export class TreeLink implements OnInit, OnChanges, OnDestroy {
    canvas: any;
    id: string;
    
    shapeFrom: Shape; 
    shapeTo: Shape;
    
    xFrom: number;
    yFrom: number;
    xTo: number;
    yTo: number;
    
    fill: string = '#CFFFCD';
    stroke: string = 'red';
    selected: boolean;
    line: any;
    initCompleted: boolean = false;

    select: EventEmitter<string> = new EventEmitter<string>();

    constructor( @Inject(forwardRef(() => TreeCanvas)) private parent: TreeCanvas) { 
        
    }

    ngOnInit() {
        this.canvas = this.parent.canvas;
        this.line = this.drawArrow(this.xFrom, this.yFrom, this.xTo, this.yTo);
        this.update();
        this.initCompleted = true;
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        if (!this.initCompleted) {
            return;
        }

         if (changes['xFrom']) { 
            this.line.attr({x1: changes['xFrom'].currentValue});
         }
         if (changes['yFrom']) { 
            this.line.attr({y1: changes['yFrom'].currentValue});
         }
         if (changes['xTo']) { 
            this.line.attr({x2: changes['xTo'].currentValue});
         }
         if (changes['yTo']) { 
            this.line.attr({y2: changes['yTo'].currentValue});
         }
    }

    ngOnDestroy() {

    }

    onShapeMove(shapeId: string) {
        console.log('shape move:', shapeId);
        this.update();
    }

    update() {
        let linkPositionsFromTo = this.getLinkPositionsFromTo(this.shapeFrom, this.shapeTo);
        this.line.attr({
            x1: linkPositionsFromTo.positionFrom.x, 
            y1: linkPositionsFromTo.positionFrom.y, 
            x2: linkPositionsFromTo.positionTo.x, 
            y2: linkPositionsFromTo.positionTo.y
        });
    }

    private getLinkPositionsFromTo(shapeFrom: Shape, shapeTo: Shape):PositionsFromTo {
        const LIMIT_SHAPES_DISTANCE = 120;
        let result = new PositionsFromTo;
        
        let linkPositionsFrom = new LinkPositions(shapeFrom.id, shapeFrom.x, shapeFrom.y, shapeFrom.width, shapeFrom.height);
        let linkPositionsTo = new LinkPositions(shapeTo.id, shapeTo.x, shapeTo.y, shapeTo.width, shapeTo.height);

         if (Math.abs(shapeTo.y - shapeFrom.y) < LIMIT_SHAPES_DISTANCE  && Math.abs(shapeTo.x - shapeFrom.x) > LIMIT_SHAPES_DISTANCE ) { 
            if (shapeFrom.x < shapeTo.x) { 
                result.positionFrom = linkPositionsFrom.right;   
                result.positionTo = linkPositionsTo.left; 
            } else {
                result.positionFrom = linkPositionsFrom.left;   
                result.positionTo = linkPositionsTo.right; 
            }
         } else {
             if (shapeFrom.y < shapeTo.y) { 
                result.positionFrom = linkPositionsFrom.bottom;   
                result.positionTo = linkPositionsTo.top; 
            } else {
                result.positionFrom = linkPositionsFrom.top;   
                result.positionTo = linkPositionsTo.bottom; 
            }
         }

        return result;
    };

    private drawArrow(xFrom: number, yFrom: number, xTo: number, yTo: number) {
        let arrow = this.canvas.polygon([0, 10, 8, 10, 4, 0, 0, 10]).attr({ fill: 'blue' }).transform('r90');
        let marker = arrow.marker(0, 0, 10, 10, 8, 5);
        let line = this.canvas.line(xFrom, yFrom, xTo, yTo).attr({
            id: 'myid',
            stroke: "blue",
            strokeWidth: 1,
            markerEnd: marker
        });

        return line;
    }

}