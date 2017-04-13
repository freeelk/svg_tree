import { Component, OnInit, QueryList, ViewChildren, EventEmitter } from '@angular/core';
import { Shape } from '../shared/shape';
import { ShapeSelection } from '../shared/shape-selection.enum';
import snap = require('snapsvg');


@Component({
    moduleId: module.id,
    selector: 'tree-toolbox',
    templateUrl: 'tree-toolbox.component.html',
    styleUrls: ['tree-toolbox.component.css'],
    outputs: ['create', 'delete']

})
export class TreeToolbox implements OnInit {
    canvas: any;
    x: number = 5;
    y: number = 5;
    width: number = 110;
    height: number = 210;
    rx: number = 0;
    ry: number = 0;
    fill: string = '#CFFFCD';
    stroke: string = 'red';
    fillColors = { reward: '#dedede', operator: '#9FD19B', filter: '#94CAFF', applicator: '#F66622' };

    shapes: Shape[] = [
        { id: 'toolbox-0', type: "reward", x: 10, y: 10, width: 100, height: 40, selected: ShapeSelection.None, data: {name: ''} },
        { id: 'toolbox-1', type: "operator", x: 10, y: 60, width: 100, height: 40, selected: ShapeSelection.None, data: {name: ''} },
        { id: 'toolbox-5', type: "applicator", x: 10, y: 110, width: 100, height: 40, selected: ShapeSelection.None, data: {name: ''} }
    ];

    deleteButton: any;

    create: EventEmitter<any> = new EventEmitter<Shape>();
    delete: EventEmitter<any> = new EventEmitter<any>();

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
                    that.create.emit({ id: '', type: shape.type, x: bBox.x, y: bBox.y, width: 100, height: 40, selected: ShapeSelection.None,  data: {name: 'new node'} });
                    this.attr({
                        transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [0, 0]
                    });
                }
            );

            let deleteButton = this.canvas.rect(this.x + 5, this.y + 160, 100, 40, this.rx, this.ry).attr({ fill: '#94caff', stroke: 'red', strokeWidth: 0 });
            let deleteText1 = this.canvas.text(shape.x + 5, this.y + 160 + 15, "Удалить").attr({ 'font-size': 12 });
            let deleteText2 = this.canvas.text(shape.x + 5, this.y + 160 + 30, "выбранный").attr({ 'font-size': 12 });
            this.deleteButton = this.canvas.g(deleteButton, deleteText1, deleteText2);

            this.deleteButton.mouseover(function () {
                deleteButton.attr({ strokeWidth: 1 });
            }).mouseout(function () {
                 deleteButton.attr({ strokeWidth: 0 });
            }).click(function(){
                 that.delete.emit();
            });

        });
    }
}
