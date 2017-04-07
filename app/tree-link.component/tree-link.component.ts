import { Component, Inject, forwardRef, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { TreeCanvas } from '../tree-canvas.component/tree-canvas.component';
import { LinkPosition, LinkPositions } from '../shared/link-positions';
import snap = require("snapsvg")

@Component({
    moduleId: module.id,
    selector: 'tree-link',
    templateUrl: 'tree-link.component.html',
    styleUrls: ['tree-link.component.css'],
    inputs: ['id', 'xFrom', 'yFrom', 'xTo', 'yTo'],
    outputs: ['select']
})
export class TreeLink implements OnInit, OnChanges, OnDestroy {
    canvas: any;
    id: string;
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

    constructor( @Inject(forwardRef(() => TreeCanvas)) private parent: TreeCanvas) { }

    ngOnInit() {
        this.canvas = this.parent.canvas;
        this.line = this.drawArrow(this.xFrom, this.yFrom, this.xTo, this.yTo);
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

    private drawArrow(xFrom: number, yFrom: number, xTo: number, yTo: number) {
        let arrow = this.canvas.polygon([0, 10, 4, 10, 2, 0, 0, 10]).attr({ fill: 'blue' }).transform('r90');
        let marker = arrow.marker(0, 0, 10, 10, 0, 5);
        let line = this.canvas.line(xFrom, yFrom, xTo, yTo).attr({
            id: 'myid',
            stroke: "blue",
            strokeWidth: 1,
            markerEnd: marker
        });

        return line;
    }



}