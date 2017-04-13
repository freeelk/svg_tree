import { Component, Inject, forwardRef, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { TreeCanvas } from '../tree-canvas.component/tree-canvas.component';
import { LinkPosition, LinkPositions } from '../shared/link-positions';
import { ShapeSelection } from '../shared/shape-selection.enum';
import snap = require("snapsvg");

@Component({
    moduleId: module.id,
    selector: 'tree-shape',
    templateUrl: 'tree-shape.component.html',
    styleUrls: ['tree-shape.component.css'],
    inputs: ['id', 'type', 'x', 'y', 'width', 'height', 'fill', 'selected'],
    outputs: ['select', 'move']
})
export class TreeShape implements OnInit, OnChanges, OnDestroy {
    canvas: any;
    id: string;
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    selected: ShapeSelection;
    shape: any;

    rx: number = 5;
    ry: number = 5;
    fillColors = {reward: '#dedede', operator: '#9FD19B', filter: '#94CAFF', applicator: '#F66622'};
    fill: string = '#CFFFCD';
    stroke: string = 'red';

    initCompleted: boolean = false;

    select: EventEmitter<any> = new EventEmitter<any>();
    move: EventEmitter<any> = new EventEmitter<any>();

    constructor( @Inject(forwardRef(() => TreeCanvas)) private parent: TreeCanvas) { }

    ngOnInit() {
        this.canvas = this.parent.canvas;
        let box = this.canvas.rect(this.x, this.y, this.width, this.height, this.rx, this.ry).attr({ fill: this.fillColors[this.type], stroke: this.stroke });
        let textId =  this.canvas.text(this.x + 5, this.y + 35, this.id).attr({'font-size':15});
        let textType =  this.canvas.text(this.x + 5, this.y + 15, this.type).attr({'font-size':12});
        
        this.shape = this.canvas.g(box, textId, textType);
        this.shape.attr({ id: this.id });

        if (this.selected === ShapeSelection.Selected) {
            this.shape.attr({ strokeWidth: 1 });
        } else {
            this.shape.attr({ strokeWidth: 0 });
        }

        let that = this;
        this.shape.click(function (event) {
            that.selected = ShapeSelection.Selected;
            that.select.emit({id: that.id, selection: that.selected});
        });

         this.shape.dblclick(function (event) {
              that.selected = ShapeSelection.Activated;
               that.select.emit({id: that.id, selection: that.selected});
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
                //Move start
                this.data('origTransform', this.transform().local );
            },
            function () {
               //Move end
            }
        );

        this.initCompleted = true;
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {

        if (!this.initCompleted) {
            return;
        }

        if (changes['selected']) {
            let selected: ShapeSelection;
            selected = changes['selected'].currentValue;

            switch (selected) {
                case ShapeSelection.None: 
                    this.shape.attr({ 'stroke-dasharray': '0'});
                    this.shape.attr({ strokeWidth: 0 });
                break
                case ShapeSelection.Selected:
                    this.shape.attr({ 'stroke-dasharray': '0'});
                    this.shape.attr({ strokeWidth: 1 });
                break
                case ShapeSelection.Activated:
                    this.shape.attr({ 'stroke-dasharray': '5'});
                    this.shape.attr({ strokeWidth: 1 });
                break;    
            };
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