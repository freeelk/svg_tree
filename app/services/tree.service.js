"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var shape_selection_enum_1 = require("../shared/shape-selection.enum");
var shapes = [
    { id: 'shape-0', type: "reward", x: 200, y: 30, width: 100, height: 40, selected: shape_selection_enum_1.ShapeSelection.None },
    { id: 'shape-1', type: "operator", x: 300, y: 220, width: 100, height: 40, selected: shape_selection_enum_1.ShapeSelection.None },
    { id: 'shape-2', type: "reward", x: 800, y: 30, width: 100, height: 40, selected: shape_selection_enum_1.ShapeSelection.None },
    { id: 'shape-3', type: "reward", x: 540, y: 30, width: 100, height: 40, selected: shape_selection_enum_1.ShapeSelection.None },
    { id: 'shape-4', type: "reward", x: 400, y: 30, width: 100, height: 40, selected: shape_selection_enum_1.ShapeSelection.None },
    { id: 'shape-5', type: "applicator", x: 400, y: 400, width: 100, height: 40, selected: shape_selection_enum_1.ShapeSelection.None }
];
var links = [
    { id: 'link-0', shapeFromId: 'shape-0', shapeToId: 'shape-1', selected: false },
    { id: 'link-1', shapeFromId: 'shape-1', shapeToId: 'shape-5', selected: false },
    { id: 'link-2', shapeFromId: 'shape-3', shapeToId: 'shape-1', selected: false },
    { id: 'link-3', shapeFromId: 'shape-4', shapeToId: 'shape-1', selected: false },
    { id: 'link-4', shapeFromId: 'shape-2', shapeToId: 'shape-5', selected: false }
];
var TreeService = (function () {
    function TreeService() {
    }
    TreeService.prototype.getShapes = function () {
        return shapes;
    };
    TreeService.prototype.getShape = function (id) {
        return shapes.find(function (shape) { return shape.id === id; });
    };
    TreeService.prototype.addShape = function (shape) {
        shapes.push(shape);
    };
    TreeService.prototype.deleteShape = function (shape) {
        var _this = this;
        shapes.forEach(function (sh, index) {
            if (sh.id === shape.id) {
                shapes.splice(index, 1);
            }
        });
        var linksForDelete = [];
        links.forEach(function (link, index) {
            if (link.shapeFromId === shape.id || link.shapeToId === shape.id) {
                linksForDelete.push(link);
            }
        });
        linksForDelete.forEach(function (link) {
            _this.deleteLink(link);
        });
    };
    TreeService.prototype.updateShape = function () {
    };
    /**
     * Возвращает объект связи между указанными в параметрах объектами
     *
     * @param shapeOne Shape
     * @param shapeTwo Shape
     * @returns Link Найденная связь, undefined, если связи нет
     */
    TreeService.prototype.getLinkBetweenShapes = function (shapeOne, shapeTwo) {
        var result;
        links.forEach(function (link) {
            if ((link.shapeFromId === shapeOne.id && link.shapeToId === shapeTwo.id) ||
                (link.shapeFromId === shapeTwo.id && link.shapeToId === shapeOne.id)) {
                result = link;
            }
        });
        return result;
    };
    TreeService.prototype.getLinks = function () {
        return links;
    };
    TreeService.prototype.getLink = function (id) {
        return links.find(function (link) { return link.id === id; });
    };
    TreeService.prototype.addLink = function (link) {
        //todo: проверка, нет ли такой связи уже и есть ли такие shapes
        links.push(link);
    };
    TreeService.prototype.deleteLink = function (link) {
        links.forEach(function (lnk, index) {
            if (lnk.id === link.id) {
                links.splice(index, 1);
            }
        });
    };
    TreeService.prototype.updateLink = function () {
    };
    return TreeService;
}());
TreeService = __decorate([
    core_1.Injectable()
], TreeService);
exports.TreeService = TreeService;
//# sourceMappingURL=tree.service.js.map