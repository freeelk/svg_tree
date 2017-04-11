import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Shape } from '../shared/shape';
import { Link } from '../shared/link';

let shapes = [
    { id: 'shape-0', x: 300, y: 30, width: 100, height: 40, selected: true },
    { id: 'shape-1', x: 500, y: 90, width: 100, height: 40, selected: false },
    { id: 'shape-2', x: 600, y: 200, width: 100, height: 40, selected: false },
    { id: 'shape-3', x: 340, y: 230, width: 100, height: 40, selected: false },
    { id: 'shape-4', x: 200, y: 230, width: 100, height: 40, selected: false },
    { id: 'shape-5', x: 10, y: 10, width: 100, height: 40, selected: false }
];

let links = [
    { id: 'link-0', shapeFromId: 'shape-0', shapeToId: 'shape-1', selected: true },
    { id: 'link-1', shapeFromId: 'shape-1', shapeToId: 'shape-2', selected: false },
    { id: 'link-2', shapeFromId: 'shape-1', shapeToId: 'shape-3', selected: false },
    { id: 'link-3', shapeFromId: 'shape-0', shapeToId: 'shape-4', selected: false }
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