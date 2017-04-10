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
var link_positions_1 = require("../shared/link-positions");
var link_1 = require("../shared/link");
var snap = require("snapsvg");
var interact = require("interactjs");
var PositionsFromTo = (function () {
    function PositionsFromTo() {
    }
    return PositionsFromTo;
}());
var TreeCanvas = (function () {
    function TreeCanvas() {
        this.shapeMove = new core_1.EventEmitter();
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
            { shapeFromId: 'shape-0', shapeToId: 'shape-1' },
            { shapeFromId: 'shape-1', shapeToId: 'shape-2' },
            { shapeFromId: 'shape-1', shapeToId: 'shape-3' },
            { shapeFromId: 'shape-0', shapeToId: 'shape-4' }
        ];
        this.shapeFromId = 'shape-1';
        this.shapeToId = 'shape-2';
    }
    TreeCanvas.prototype.ngOnInit = function () {
        this.canvas = snap('#tree-canvas');
        var that = this;
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
            var target = event.target, x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx, y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy, id = target.getAttribute('id');
            target.style.webkitTransform =
                target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px)';
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }
        this.setLink(this.shapeFromId, this.shapeToId);
    };
    TreeCanvas.prototype.addShape = function () {
        console.log('add shape');
        var id = 'shape-' + (this.shapes.length + 1);
        var shape = { id: id, x: 450, y: 10, xInit: 450, yInit: 10, width: 100, height: 20, selected: false };
        this.shapes.push(shape);
    };
    TreeCanvas.prototype.removeShape = function (id) {
        var _this = this;
        console.log('remove shape');
        this.shapes.forEach(function (shape, index) {
            if (shape.selected) {
                _this.shapes.splice(index, 1);
            }
        });
    };
    TreeCanvas.prototype.getShape = function (id) {
        return this.shapes.find(function (shape) { return shape.id === id; });
    };
    TreeCanvas.prototype.shapeSelectHandler = function (id) {
        this.shapes.forEach(function (shape) {
            if (shape.id === id) {
                shape.selected = true;
            }
            else {
                shape.selected = false;
            }
        });
    };
    TreeCanvas.prototype.shapeMoveHandler = function (event) {
        var shape = this.getShape(event.id);
        shape.x = event.x;
        shape.y = event.y;
        //this.shapeMove.emit(event.id);
        this.treeLinks.forEach(function (item) {
            item.onShapeMove(event.id);
        });
        //this.setLink(this.shapeFromId, this.shapeToId);
    };
    TreeCanvas.prototype.setLink = function (shapeIdFrom, shapeIdTo) {
        var shapeFrom = this.getShape(shapeIdFrom);
        var shapeTo = this.getShape(shapeIdTo);
        var linkPositionsFromTo = this.getLinkPositionsFromTo(shapeFrom, shapeTo);
        this.link = new link_1.Link();
        this.link.xFrom = linkPositionsFromTo.positionFrom.x;
        this.link.yFrom = linkPositionsFromTo.positionFrom.y;
        this.link.xTo = linkPositionsFromTo.positionTo.x;
        this.link.yTo = linkPositionsFromTo.positionTo.y;
        console.log(shapeTo.x, shapeTo.y, this.link.xTo, this.link.yTo);
    };
    TreeCanvas.prototype.getLinkPositionsFromTo = function (shapeFrom, shapeTo) {
        var LIMIT_SHAPES_DISTANCE = 60;
        var result = new PositionsFromTo;
        var linkPositionsFrom = new link_positions_1.LinkPositions(shapeFrom.id, shapeFrom.x, shapeFrom.y, shapeFrom.width, shapeFrom.height);
        var linkPositionsTo = new link_positions_1.LinkPositions(shapeTo.id, shapeTo.x, shapeTo.y, shapeTo.width, shapeTo.height);
        if (Math.abs(shapeTo.y - shapeFrom.y) < LIMIT_SHAPES_DISTANCE) {
            if (shapeFrom.x < shapeTo.x) {
                result.positionFrom = linkPositionsFrom.right;
                result.positionTo = linkPositionsTo.left;
            }
            else {
                result.positionFrom = linkPositionsFrom.left;
                result.positionTo = linkPositionsTo.right;
            }
        }
        else {
            if (shapeFrom.y < shapeTo.y) {
                result.positionFrom = linkPositionsFrom.bottom;
                result.positionTo = linkPositionsTo.top;
            }
            else {
                result.positionFrom = linkPositionsFrom.top;
                result.positionTo = linkPositionsTo.bottom;
            }
        }
        return result;
    };
    ;
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
    __metadata("design:paramtypes", [])
], TreeCanvas);
exports.TreeCanvas = TreeCanvas;
//# sourceMappingURL=tree-canvas.component.js.map