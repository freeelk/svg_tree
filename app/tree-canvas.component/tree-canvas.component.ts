import { Component, EventEmitter, OnInit, QueryList, ViewChildren } from '@angular/core';
import { TreeShape } from '../tree-shape.component/tree-shape.component';
import { TreeLink } from '../tree-link.component/tree-link.component';
import { LinkPosition, LinkPositions } from '../shared/link-positions';
import { Shape } from '../shared/shape';
import { Link } from '../shared/link';
import snap = require('snapsvg');
import interact = require('interactjs');


class PositionsFromTo {
    positionFrom: LinkPosition;
    positionTo: LinkPosition;
}


@Component({
    moduleId: module.id,
    selector: 'tree-canvas',
    templateUrl: 'tree-canvas.component.html',
    styleUrls: ['tree-canvas.component.css'],
    outputs: ['shapeMove']

})
export class TreeCanvas implements OnInit {
    canvas: any;
    shapes: Array<Shape>;
    links: Array<Link>;

    shapeFromId: string;
    shapeToId: string;
    link: Link;

    @ViewChildren(TreeLink)
    private treeLinks: QueryList<TreeLink>;

    shapeMove: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
        console.clear();
        this.canvas = snap('#tree-canvas');
        this.shapes = [
            { id: 'shape-0', x: 500, y: 10, xInit: 500, yInit: 10, width: 100, height: 20, selected: true },
            { id: 'shape-1', x: 500, y: 60, xInit: 500, yInit: 60, width: 100, height: 20, selected: false },
            { id: 'shape-2', x: 600, y: 200, xInit: 600, yInit: 200, width: 100, height: 20, selected: false },
            { id: 'shape-3', x: 340, y: 230, xInit: 340, yInit: 230, width: 100, height: 20, selected: false },
            { id: 'shape-4', x: 200, y: 230, xInit: 200, yInit: 230, width: 100, height: 20, selected: false }
        ];

        this.links = [
            { shapeFromId: 'shape-0', shapeToId: 'shape-1'},
            { shapeFromId: 'shape-1', shapeToId: 'shape-2'},
            { shapeFromId: 'shape-1', shapeToId: 'shape-3'},
            { shapeFromId: 'shape-0', shapeToId: 'shape-4'}
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
        //this.shapeMove.emit(event.id);

        this.treeLinks.forEach(item=> {
            item.onShapeMove(event.id);
        });
        //this.setLink(this.shapeFromId, this.shapeToId);
    }


    setLink(shapeIdFrom: string, shapeIdTo: string) {
        let shapeFrom = this.getShape(shapeIdFrom);
        let shapeTo = this.getShape(shapeIdTo);
        let linkPositionsFromTo = this.getLinkPositionsFromTo(shapeFrom, shapeTo);

        this.link = new Link();

        this.link.xFrom = linkPositionsFromTo.positionFrom.x;
        this.link.yFrom = linkPositionsFromTo.positionFrom.y;
        this.link.xTo = linkPositionsFromTo.positionTo.x;
        this.link.yTo = linkPositionsFromTo.positionTo.y;

        console.log(shapeTo.x, shapeTo.y, this.link.xTo, this.link.yTo);
    }


    private getLinkPositionsFromTo(shapeFrom: Shape, shapeTo: Shape):PositionsFromTo {
        const LIMIT_SHAPES_DISTANCE = 60;
        let result = new PositionsFromTo;
        
        let linkPositionsFrom = new LinkPositions(shapeFrom.id, shapeFrom.x, shapeFrom.y, shapeFrom.width, shapeFrom.height);
        let linkPositionsTo = new LinkPositions(shapeTo.id, shapeTo.x, shapeTo.y, shapeTo.width, shapeTo.height);

         if (Math.abs(shapeTo.y - shapeFrom.y) < LIMIT_SHAPES_DISTANCE) { 
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

}
