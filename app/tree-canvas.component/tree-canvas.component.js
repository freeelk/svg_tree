"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var tree_link_component_1 = require("../tree-link.component/tree-link.component");
var shape_selection_enum_1 = require("../shared/shape-selection.enum");
var tree_service_1 = require("../services/tree.service");
var snap = require("snapsvg");
var TreeCanvas = (function () {
    function TreeCanvas(treeService) {
        this.treeService = treeService;
        this.shapes = treeService.getShapes();
        this.links = treeService.getLinks();
    }
    TreeCanvas.prototype.ngOnInit = function () {
        this.canvas = snap('#tree-canvas');
    };
    TreeCanvas.prototype.addShape = function (shapeType) {
        var id = 'shape-' + (this.shapes.length + 1);
        var shape = { id: id, type: shapeType, x: 450, y: 10, xInit: 450, yInit: 10, width: 100, height: 40, selected: shape_selection_enum_1.ShapeSelection.None };
        this.treeService.addShape(shape);
    };
    TreeCanvas.prototype.removeShape = function (id) {
        var _this = this;
        this.shapes.forEach(function (shape, index) {
            if (shape.selected === shape_selection_enum_1.ShapeSelection.Selected) {
                _this.treeService.deleteShape(shape);
            }
        });
    };
    TreeCanvas.prototype.getShape = function (id) {
        return this.treeService.getShape(id);
    };
    TreeCanvas.prototype.addLink = function (shapeFromId, shapeToId) {
        console.log(shapeFromId, shapeToId);
        var id = 'link-' + (this.links.length + 1);
        var link = { id: id, shapeFromId: shapeFromId, shapeToId: shapeToId, selected: false };
        this.treeService.addLink(link);
        this.links = this.treeService.getLinks();
    };
    TreeCanvas.prototype.removeLink = function () {
        var _this = this;
        this.links.forEach(function (link, index) {
            if (link.selected) {
                _this.treeService.deleteLink(link);
            }
        });
    };
    TreeCanvas.prototype.shapeSelectHandler = function (event) {
        var activatedShape = this.shapes.find(function (shape) { return shape.selected === shape_selection_enum_1.ShapeSelection.Activated; });
        if (activatedShape) {
            var clickedShape = this.shapes.find(function (shape) { return shape.id === event.id; });
            if (clickedShape !== activatedShape) {
                var link = this.treeService.getLinkBetweenShapes(activatedShape, clickedShape);
                if (link) {
                    this.treeService.deleteLink(link);
                }
                else {
                    this.addLink(activatedShape.id, clickedShape.id);
                }
            }
        }
        this.shapes.forEach(function (shape) {
            if (shape.id === event.id) {
                shape.selected = event.selection;
            }
            else {
                shape.selected = shape_selection_enum_1.ShapeSelection.None;
            }
        });
    };
    TreeCanvas.prototype.linkSelectHandler = function (id) {
        this.links.forEach(function (link) {
            if (link.id === id) {
                console.log('link selected', id);
                link.selected = true;
            }
            else {
                link.selected = false;
            }
        });
    };
    TreeCanvas.prototype.shapeMoveHandler = function (event) {
        var shape = this.treeService.getShape(event.id);
        shape.x = event.x;
        shape.y = event.y;
        this.treeLinks.forEach(function (item) {
            item.onShapeMove(event.id);
        });
    };
    TreeCanvas.prototype.shapeCreateHandler = function (event) {
        event.id = 'shape-' + (this.shapes.length + 1);
        this.treeService.addShape(event);
    };
    TreeCanvas.prototype.shapeDeleteHandler = function () {
        var _this = this;
        this.shapes.forEach(function (shape, index) {
            if (shape.selected === shape_selection_enum_1.ShapeSelection.Selected) {
                _this.treeService.deleteShape(shape);
            }
        });
    };
    return TreeCanvas;
}());
__decorate([
    core_1.ViewChildren(tree_link_component_1.TreeLink),
    __metadata("design:type", core_1.QueryList)
], TreeCanvas.prototype, "treeLinks", void 0);
TreeCanvas = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tree-canvas',
        templateUrl: 'tree-canvas.component.html',
        styleUrls: ['tree-canvas.component.css'],
        outputs: ['shapeMove']
    }),
    __metadata("design:paramtypes", [tree_service_1.TreeService])
], TreeCanvas);
exports.TreeCanvas = TreeCanvas;
//# sourceMappingURL=tree-canvas.component.js.map