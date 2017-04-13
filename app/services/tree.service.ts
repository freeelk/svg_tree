import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Shape } from '../shared/shape';
import { Link } from '../shared/link';
import { TreeNodeData } from '../shared/tree-node-data';
import { ShapeSelection } from '../shared/shape-selection.enum';
import { UUID } from 'angular2-uuid';

let shapes = [
    { id: UUID.UUID(), type: "reward", x: 200, y: 30, width: 100, height: 40, selected: ShapeSelection.None, data: {name: 'node1'} },
    { id: UUID.UUID(), type: "operator", x: 300, y: 220, width: 100, height: 40, selected: ShapeSelection.None, data: {name: 'node2'} },
    { id: UUID.UUID(), type: "reward", x: 800, y: 30, width: 100, height: 40, selected: ShapeSelection.None, data: {name: 'node2'} },
    { id: UUID.UUID(), type: "reward", x: 540, y: 30, width: 100, height: 40, selected: ShapeSelection.None, data: {name: 'node4'} },
    { id: UUID.UUID(), type: "reward", x: 400, y: 30, width: 100, height: 40, selected: ShapeSelection.None, data: {name: 'node5'} },
    { id: UUID.UUID(), type: "applicator", x: 400, y: 400, width: 100, height: 40, selected: ShapeSelection.None, data: {name: 'node6'} }
];

let links = [
    { id: 'link-0', shapeFromId: shapes[0].id, shapeToId: shapes[1].id, selected: false },
    { id: 'link-1', shapeFromId: shapes[1].id, shapeToId: shapes[5].id, selected: false },
    { id: 'link-2', shapeFromId: shapes[3].id, shapeToId: shapes[1].id, selected: false },
    { id: 'link-3', shapeFromId: shapes[4].id, shapeToId: shapes[1].id, selected: false },
    { id: 'link-4', shapeFromId: shapes[2].id, shapeToId: shapes[5].id, selected: false }
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

    updateShape() {

    }

    /**
     * Возвращает объект связи между указанными в параметрах объектами
     * 
     * @param shapeOne Shape 
     * @param shapeTwo Shape
     * @returns Link Найденная связь, undefined, если связи нет
     */
    getLinkBetweenShapes(shapeOne: Shape, shapeTwo: Shape): Link {
        let result: Link;

        links.forEach(link=>{
            if ((link.shapeFromId === shapeOne.id && link.shapeToId === shapeTwo.id) || 
                (link.shapeFromId === shapeTwo.id && link.shapeToId === shapeOne.id)) {
                result = link;
            }
        });

        return result;
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