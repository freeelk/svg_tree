import { Component, OnInit } from '@angular/core';
import { TreeShape } from '../tree-shape.component/tree-shape.component';
import { TreeLink } from '../tree-link.component/tree-link.component';
import { LinkPosition, LinkPositions } from '../shared/link-positions';
import snap = require('snapsvg');
import interact = require('interactjs');

class Shape {
    id: string;
    x: number;
    y: number;
    xInit: number;
    yInit: number;
    width: number;
    height: number;
    selected: boolean;
}

class Link {
    xFrom: number;
    yFrom: number;
    xTo: number;
    yTo: number;
}

@Component({
    moduleId: module.id,
    selector: 'tree-canvas',
    templateUrl: 'tree-canvas.component.html',
    styleUrls: ['tree-canvas.component.css'],

})
export class TreeCanvas implements OnInit {
    canvas: any;
    shapes: Array<Shape>;

    shapeFromId: string;
    shapeToId: string;
    link: Link;

    constructor() {
        console.clear();
        this.canvas = snap('#tree-canvas');
        this.shapes = [
            { id: 'shape-0', x: 50, y: 50, xInit: 10, yInit: 10, width: 100, height: 20, selected: false },
            { id: 'shape-1', x: 500, y: 10, xInit: 500, yInit: 10, width: 100, height: 20, selected: true },
            { id: 'shape-2', x: 600, y: 200, xInit: 600, yInit: 200, width: 100, height: 20, selected: false },
            { id: 'shape-3', x: 340, y: 230, xInit: 340, yInit: 230, width: 100, height: 20, selected: false }
        ];

        this.shapeFromId = 'shape-1';
        this.shapeToId = 'shape-2';
    }


    ngOnInit() {
        this.canvas = snap('#tree-canvas');
        let that = this;

        interact('.draggable1')
            .draggable({
                inertia: true,
                restrict: {
                    restriction: "parent",
                    endOnly: true,
                    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
                },
                autoScroll: true,

                onmove: dragMoveListener,
                onend: function (event) { }
            });

        function dragMoveListener(event) {
            let target = event.target,
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy,
                id = target.getAttribute('id');

            //let shape = that.getShape(id);
            //shape.x = Math.round(shape.xInit + x);
            //shape.y = Math.round(shape.yInit + y);

            target.style.webkitTransform =
                target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)';

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }

        this.setLink(this.shapeFromId, this.shapeToId);

    }

    addShape() {
        console.log('add shape');
        let id = 'shape-' + (this.shapes.length + 1);

        let shape = { id: id, x: 450, y: 10, xInit: 450, yInit: 10, width: 100, height: 20, selected: false };
        this.shapes.push(shape);
    }

    removeShape(id: string) {
        console.log('remove shape');

        this.shapes.forEach((shape, index) => {
            if (shape.selected) {
                this.shapes.splice(index, 1);
            }
        });
    }

    getShape(id: string) {
        return this.shapes.find(shape => shape.id === id);
    }

    shapeSelectHandler(id: string) {
        this.shapes.forEach(shape => {
            if (shape.id === id) {
                shape.selected = true;
            } else {
                shape.selected = false;
            }
        });
    }

    shapeMoveHandler(event) {
        let shape = this.getShape(event.id);
        shape.x = event.x;
        shape.y = event.y;

        let shapeTo = this.getShape(this.shapeToId);
        let shapeFrom = this.getShape(this.shapeFromId);

        if (event.id === this.shapeFromId) {
            let linkPositionsFrom = new LinkPositions(event.id, event.x, event.y, shapeFrom.width, shapeFrom.height);
            let linkPositionsTo = new LinkPositions(shapeTo.id, shapeTo.x, shapeTo.y, shapeTo.width, shapeTo.height);

            if (Math.abs(shapeTo.y - shapeFrom.y) < 40) {
                if (shapeFrom.x < shapeTo.x) {
                    let linkPositionFrom = linkPositionsFrom.right;
                    let linkPositionTo = linkPositionsTo.left;
                } else {
                    let linkPositionFrom = linkPositionsFrom.left;
                    let linkPositionTo = linkPositionsTo.right;
                }
            } else {
                if (shapeFrom.y < shapeTo.y) {
                    let linkPositionFrom = linkPositionsFrom.bottom;
                } else {
                    let linkPositionFrom = linkPositionsFrom.top;
                }
                if (shapeTo.y < shapeFrom.y) {
                    let linkPositionTo = linkPositionsTo.bottom;
                } else {
                    let linkPositionTo = linkPositionsTo.top;
                }
            }

            this.link.xFrom = linkPositionFrom.x;
            this.link.yFrom = linkPositionFrom.y;
            this.link.xTo = linkPositionTo.x;
            this.link.yTo = linkPositionTo.y;
        }


        if (event.id === this.shapeToId) {
            let linkPositions = new LinkPositions(event.id, event.x, event.y, shapeTo.width, shapeTo.height);

            if (shapeFrom.y < shapeTo.y) {
                let linkPosition = linkPositions.bottom;
            } else {
                let linkPosition = linkPositions.top;
            }
            if (shapeTo.y < shapeFrom.y) {
                let linkPosition = linkPositions.bottom;
            } else {
                let linkPosition = linkPositions.top;
            }

            this.link.xTo = linkPosition.x;
            this.link.yTo = linkPosition.y;
        }
    }

    setLink(shapeIdFrom: string, shapeIdTo: string) {
        let shapeFrom = this.getShape(shapeIdFrom);
        let shapeTo = this.getShape(shapeIdTo);

        let shapeFromLinkPositions = new LinkPositions(shapeFrom.id, shapeFrom.x, shapeFrom.y, shapeFrom.width, shapeFrom.height);
        let shapeToLinkPositions = new LinkPositions(shapeTo.id, shapeTo.x, shapeTo.y, shapeTo.width, shapeTo.height);
        this.calcLinkCoordinates(shapeFromLinkPositions, shapeToLinkPositions);
    }

    calcLinkCoordinates(shapeFromLinkPositions: LinkPositions, shapeToLinkPositions: LinkPositions) {
        this.link = new Link();
        this.link.xFrom = shapeFromLinkPositions.bottom.x;
        this.link.yFrom = shapeFromLinkPositions.bottom.y;
        this.link.xTo = shapeToLinkPositions.top.x;
        this.link.yTo = shapeToLinkPositions.top.y;
    }


}
