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
var shapes = [
    { id: 'shape-0', x: 300, y: 30, width: 100, height: 40, selected: true },
    { id: 'shape-1', x: 500, y: 90, width: 100, height: 40, selected: false },
    { id: 'shape-2', x: 600, y: 200, width: 100, height: 40, selected: false },
    { id: 'shape-3', x: 340, y: 230, width: 100, height: 40, selected: false },
    { id: 'shape-4', x: 200, y: 230, width: 100, height: 40, selected: false },
    { id: 'shape-5', x: 10, y: 10, width: 100, height: 40, selected: false }
];
var links = [
    { id: 'link-0', shapeFromId: 'shape-0', shapeToId: 'shape-1', selected: true },
    { id: 'link-1', shapeFromId: 'shape-1', shapeToId: 'shape-2', selected: false },
    { id: 'link-2', shapeFromId: 'shape-1', shapeToId: 'shape-3', selected: false },
    { id: 'link-3', shapeFromId: 'shape-0', shapeToId: 'shape-4', selected: false }
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
    TreeService.prototype.updateshape = function () {
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