import { Component, Inject, forwardRef, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { TreeCanvas } from '../tree-canvas.component/tree-canvas.component';
import { LinkPosition, LinkPositions } from '../shared/link-positions';
import snap = require("snapsvg")

@Component({
    moduleId: module.id,
    selector: 'tree-shape',
    templateUrl: 'tree-shape.component.html',
    styleUrls: ['tree-shape.component.css'],
    inputs: ['id', 'x', 'y', 'width', 'height', 'fill', 'selected'],
    outputs: ['select', 'move']
})
export class TreeShape implements OnInit, OnChanges, OnDestroy {
    canvas: any;
    id: string;
    x: number;
    y: number;
    xInit: number;
    yInit: number;
    width: number = 120;
    height: number = 60;
    rx: number = 0;
    ry: number = 0;
    fill: string = '#CFFFCD';
    stroke: string = 'red';
    selected: boolean;
    shape: any;
    initCompleted: boolean = false;

    select: EventEmitter<string> = new EventEmitter<string>();
    move: EventEmitter<any> = new EventEmitter<any>();

    constructor( @Inject(forwardRef(() => TreeCanvas)) private parent: TreeCanvas) { }

    ngOnInit() {
        this.canvas = this.parent.canvas;
        this.xInit = this.x;
        this.yInit = this.y;
        this.shape = this.canvas.rect(this.x, this.y, this.width, this.height, this.rx, this.ry).attr({ fill: this.fill, stroke: this.stroke });

        this.shape.attr({ id: this.id });
        this.shape.addClass('draggable');

        if (this.selected) {
            this.shape.attr({ strokeWidth: 1 });
        } else {
            this.shape.attr({ strokeWidth: 0 });
        }

        let that = this;
        this.shape.dblclick(function (event) {
            that.selected = true;

            that.select.emit(that.id);
        });

        this.shape.drag(
            function (dx, dy) {
                 this.attr({
                    transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
                });

                let bBox = that.shape.getBBox();
                that.x = bBox.x;
                that.y = bBox.y;
                that.move.emit({id: that.id, x: bBox.x, y: bBox.y});
            },
            function () {
                this.data('origTransform', this.transform().local );
                console.log("Move started");
            },
            function () {
                console.log("Move stopped");
            }
        );

        this.initCompleted = true;
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {

        if (!this.initCompleted) {
            return;
        }

        if (changes['selected']) {
            if (changes['selected'].currentValue == true) {
                this.shape.attr({ strokeWidth: 1 });
            } else {
                this.shape.attr({ strokeWidth: 0 });
            }
        }

    }

    ngOnDestroy() {
        console.log('destroy ' + this.id);
        this.shape.remove();
    }

    getLinkPositions(): LinkPositions {
        if (this) {
            return new LinkPositions(this.id, this.x, this.y, this.width, this.height);
        }
    }


}