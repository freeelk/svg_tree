import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { TreeShape } from '../tree-shape.component/tree-shape.component';
import { TreeLink } from '../tree-link.component/tree-link.component';

import { Shape } from '../shared/shape';
import { Link } from '../shared/link';
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

    addShape() {
        let id = 'shape-' + (this.shapes.length + 1);
        let shape = { id: id, x: 450, y: 10, xInit: 450, yInit: 10, width: 100, height: 40, selected: false };
        this.treeService.addShape(shape);
    }

    removeShape(id: string) {
        this.shapes.forEach((shape, index) => {
            if (shape.selected) {
                this.treeService.deleteShape(shape);
            }
        });
    }

    getShape(id: string): Shape {
        return this.treeService.getShape(id);
    }

    addLink() {
        let link = { id: 'link-4', shapeFromId: 'shape-5', shapeToId: 'shape-0', selected: false     };
        this.treeService.addLink(link);
    }

    removeLink() {
        this.links.forEach((link, index) => {
            if (link.selected) {
                this.treeService.deleteLink(link);
            }
        });
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

        this.treeLinks.forEach(item=> {
            item.onShapeMove(event.id);
        });
    }

}
