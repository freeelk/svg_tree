import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { TreeShape } from '../tree-shape.component/tree-shape.component';
import { TreeLink } from '../tree-link.component/tree-link.component';
import { Shape } from '../shared/shape';
import { Link } from '../shared/link';
import { ShapeSelection } from '../shared/shape-selection.enum';
import { TreeNodeData } from '../shared/tree-node-data';
import { TreeService } from "../services/tree.service";
import { UUID } from 'angular2-uuid';

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
    selectedNodeId: string;
    selectedNodeData: TreeNodeData;

    @ViewChildren(TreeLink)
    private treeLinks: QueryList<TreeLink>;

    constructor(private treeService: TreeService) {
        this.shapes = treeService.getShapes();
        this.links = treeService.getLinks();
    }

    ngOnInit() {
        this.canvas = snap('#tree-canvas');
        this.selectedNodeData = {name: ''};
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
        let id = UUID.UUID(); 
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
        let clickedShape = this.shapes.find(shape => shape.id === event.id);
        this.selectedNodeData = clickedShape.data;
        this.selectedNodeId = clickedShape.id;

        let activatedShape = this.shapes.find(shape => shape.selected === ShapeSelection.Activated);
        if (activatedShape) {
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
        event.id = UUID.UUID();
        this.treeService.addShape(event);
    }

    shapeDeleteHandler() {
        this.shapes.forEach((shape, index) => {
            if (shape.selected === ShapeSelection.Selected) {
                this.treeService.deleteShape(shape);
            }
        });
    }

    selectedNodeDataChangeHandler(data: TreeNodeData) {
        let selectedShape =  this.getShape(this.selectedNodeId);
        if ( selectedShape ) {
            selectedShape.data = data;
        }
    }

}
