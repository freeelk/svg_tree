import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { TreeShape } from '../tree-shape.component/tree-shape.component';
import { TreeLink } from '../tree-link.component/tree-link.component';

import { Shape } from '../shared/shape';
import { Link } from '../shared/link';
import { ShapeSelection } from '../shared/shape-selection.enum';
import { TreeService } from "../services/tree.service";
import snap = require('snapsvg');


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

    @ViewChildren(TreeLink)
    private treeLinks: QueryList<TreeLink>;

    constructor(private treeService: TreeService) {
        this.shapes = treeService.getShapes();
        this.links = treeService.getLinks();
    }

    ngOnInit() {
        this.canvas = snap('#tree-canvas');
    }

    addShape(shapeType: string) {
        let id = 'shape-' + (this.shapes.length + 1);
        let shape = { id: id, type: shapeType, x: 450, y: 10, xInit: 450, yInit: 10, width: 100, height: 40, selected: ShapeSelection.None };
        this.treeService.addShape(shape);
    }

    removeShape(id: string) {
        this.shapes.forEach((shape, index) => {
            if (shape.selected === ShapeSelection.Selected) {
                this.treeService.deleteShape(shape);
            }
        });
    }

    getShape(id: string): Shape {
        return this.treeService.getShape(id);
    }

    addLink(shapeFromId, shapeToId) {
        console.log(shapeFromId, shapeToId);
        let id = 'link-' + (this.links.length + 1);
        let link = { id: id, shapeFromId: shapeFromId, shapeToId: shapeToId, selected: false };
        this.treeService.addLink(link);
        this.links = this.treeService.getLinks();
    }

    removeLink() {
        this.links.forEach((link, index) => {
            if (link.selected) {
                this.treeService.deleteLink(link);
            }
        });
    }

    shapeSelectHandler(event) {

        let activatedShape = this.shapes.find(shape => shape.selected === ShapeSelection.Activated);


        if (activatedShape) {
            let clickedShape = this.shapes.find(shape => shape.id === event.id);
            if (clickedShape !== activatedShape) {
                let link = this.treeService.getLinkBetweenShapes(activatedShape, clickedShape);
                if (link) {
                    this.treeService.deleteLink(link);
                } else {
                    this.addLink(activatedShape.id, clickedShape.id);
                }
            }

        }

        this.shapes.forEach(shape => {
            if (shape.id === event.id) {
                shape.selected = event.selection;
            } else {
                shape.selected = ShapeSelection.None;
            }
        });
    }

    linkSelectHandler(id: string) {
        this.links.forEach(link => {
            if (link.id === id) {
                console.log('link selected', id);
                link.selected = true;
            } else {
                link.selected = false;
            }
        });
    }


    shapeMoveHandler(event) {
        let shape = this.treeService.getShape(event.id);
        shape.x = event.x;
        shape.y = event.y;

        this.treeLinks.forEach(item => {
            item.onShapeMove(event.id);
        });
    }

    shapeCreateHandler(event: Shape) {
        event.id = 'shape-' + (this.shapes.length + 1);
        this.treeService.addShape(event);
    }

}
