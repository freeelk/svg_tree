import { Component, OnInit, QueryList, ViewChildren,  EventEmitter } from '@angular/core';
import { Shape } from '../shared/shape';
import { ShapeSelection } from '../shared/shape-selection.enum'
import snap = require('snapsvg');


@Component({
    moduleId: module.id,
    selector: 'tree-toolbox',
    templateUrl: 'tree-toolbox.component.html',
    styleUrls: ['tree-toolbox.component.css'],
    outputs: ['create']

})
export class TreeToolbox implements OnInit {
    canvas: any;
    x: number = 5;
    y: number = 5;
    width: number = 110;
    height: number = 150;
    rx: number = 0;
    ry: number = 0;
    fill: string = '#CFFFCD';
    stroke: string = 'red';
    fillColors = { reward: '#dedede', operator: '#9FD19B', filter: '#94CAFF', applicator: '#F66622' };

    shapes: Shape[] = [
        { id: 'toolbox-0', type: "reward", x: 10, y: 10, width: 100, height: 40, selected: ShapeSelection.None },
        { id: 'toolbox-1', type: "operator", x: 10, y: 60, width: 100, height: 40, selected: ShapeSelection.None },
        { id: 'toolbox-5', type: "applicator", x: 10, y: 110, width: 100, height: 40, selected: ShapeSelection.None }
    ];

    create: EventEmitter<any> = new EventEmitter<Shape>();


    constructor() {

    }

    ngOnInit() {
        this.canvas = snap('#tree-canvas');
        let box = this.canvas.rect(this.x, this.y, this.width, this.height, this.rx, this.ry).attr({ fill: this.fill, strokeWidth: 0 });
        let that = this;

        this.shapes.forEach(shape => {
            let rect = this.canvas.rect(shape.x, shape.y, shape.width, shape.height, 5, 5).attr({ fill: this.fillColors[shape.type], strokeWidth: 0 });
            let textType = this.canvas.text(shape.x + 5, shape.y + 15, shape.type).attr({ 'font-size': 12 });
            let tbShape = this.canvas.g(rect, textType);
            let that1 = that;

            tbShape.drag(
                function (dx, dy) {
                    this.attr({
                        transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
                    });
                },
                function () {
                    //Move start
                    this.data('origTransform', this.transform().local);
                },
                function () {
                    let bBox = this.getBBox();
                    that.create.emit({ id: '', type: shape.type, x: bBox.x, y:  bBox.y, width: 100, height: 40, selected: false });
                    this.attr({
                        transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [0, 0]
                    });
                }
            );

        });
    }
}
