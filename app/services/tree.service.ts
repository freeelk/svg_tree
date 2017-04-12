import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Shape } from '../shared/shape';
import { Link } from '../shared/link';

let shapes = [
    { id: 'shape-0', type: "reward", x: 200, y: 30, width: 100, height: 40, selected: false },
    { id: 'shape-1', type: "operator", x: 300, y: 220, width: 100, height: 40, selected: false },
    { id: 'shape-2', type: "reward", x: 800, y: 30, width: 100, height: 40, selected: false },
    { id: 'shape-3', type: "reward", x: 540, y: 30, width: 100, height: 40, selected: false },
    { id: 'shape-4', type: "reward", x: 400, y: 30, width: 100, height: 40, selected: false },
    { id: 'shape-5', type: "applicator", x: 400, y: 400, width: 100, height: 40, selected: false }
];

let links = [
    { id: 'link-0', shapeFromId: 'shape-0', shapeToId: 'shape-1', selected: false },
    { id: 'link-1', shapeFromId: 'shape-1', shapeToId: 'shape-5', selected: false },
    { id: 'link-2', shapeFromId: 'shape-3', shapeToId: 'shape-1', selected: false },
    { id: 'link-3', shapeFromId: 'shape-4', shapeToId: 'shape-1', selected: false },
    { id: 'link-4', shapeFromId: 'shape-2', shapeToId: 'shape-5', selected: false }
];

@Injectable()
export class TreeService { 
    getShapes() {
        return shapes;
    }

    getShape(id: string) {
        return shapes.find(shape => shape.id === id);
    }

    addShape(shape: Shape) {
        shapes.push(shape);
    }

    deleteShape(shape: Shape) {
        shapes.forEach((sh, index) => {
            if (sh.id === shape.id) {
                shapes.splice(index, 1);
            }
        });

        let linksForDelete = [];
        links.forEach((link, index) => {
            if (link.shapeFromId === shape.id || link.shapeToId === shape.id) {
                linksForDelete.push(link);
            }
        });

        linksForDelete.forEach(link =>{
            this.deleteLink(link);
        });
    }

    updateshape() {

    }

    getLinks() {
        return links;
    }

    getLink(id: string) {
        return links.find(link => link.id === id);
    }

    addLink(link: Link) {
        //todo: проверка, нет ли такой связи уже и есть ли такие shapes
        links.push(link);
    }

    deleteLink(link: Link) {
        links.forEach((lnk, index) => {
            if (lnk.id === link.id) {
                links.splice(index, 1);
            }
        });
    }

    updateLink() {

    }


}