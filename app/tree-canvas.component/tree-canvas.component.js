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
var link_positions_1 = require("../shared/link-positions");
var snap = require("snapsvg");
var interact = require("interactjs");
var Shape = (function () {
    function Shape() {
    }
    return Shape;
}());
var Link = (function () {
    function Link() {
    }
    return Link;
}());
var TreeCanvas = (function () {
    function TreeCanvas() {
        console.clear();
        this.canvas = snap('#tree-canvas');
        this.shapes = [
            { id: 'shape-0', x: 50, y: 50, xInit: 10, yInit: 10, width: 100, height: 20, selected: false },
            { id: 'shape-1', x: 500, y: 10, xInit: 500, yInit: 10, width: 100, height: 20, selected: true },
            { id: 'shape-2', x: 600, y: 200, xInit: 600, yInit: 200, width: 100, height: 20, selected: false },
            { id: 'shape-3', x: 340, y: 230, xInit: 340, yInit: 230, width: 100, height: 20, selected: false }
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
            //let shape = that.getShape(id);
            //shape.x = Math.round(shape.xInit + x);
            //shape.y = Math.round(shape.yInit + y);
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
        var shapeTo = this.getShape(this.shapeToId);
        var shapeFrom = this.getShape(this.shapeFromId);
        if (event.id === this.shapeFromId) {
            var linkPositionsFrom = new link_positions_1.LinkPositions(event.id, event.x, event.y, shapeFrom.width, shapeFrom.height);
            var linkPositionsTo = new link_positions_1.LinkPositions(shapeTo.id, shapeTo.x, shapeTo.y, shapeTo.width, shapeTo.height);
            if (Math.abs(shapeTo.y - shapeFrom.y) < 40) {
                if (shapeFrom.x < shapeTo.x) {
                    var linkPositionFrom = linkPositionsFrom.right;
                    var linkPositionTo = linkPositionsTo.left;
                }
                else {
                    var linkPositionFrom = linkPositionsFrom.left;
                    var linkPositionTo = linkPositionsTo.right;
                }
            }
            else {
                if (shapeFrom.y < shapeTo.y) {
                    var linkPositionFrom = linkPositionsFrom.bottom;
                }
                else {
                    var linkPositionFrom = linkPositionsFrom.top;
                }
                if (shapeTo.y < shapeFrom.y) {
                    var linkPositionTo = linkPositionsTo.bottom;
                }
                else {
                    var linkPositionTo = linkPositionsTo.top;
                }
            }
            this.link.xFrom = linkPositionFrom.x;
            this.link.yFrom = linkPositionFrom.y;
            this.link.xTo = linkPositionTo.x;
            this.link.yTo = linkPositionTo.y;
        }
        if (event.id === this.shapeToId) {
            var linkPositions = new link_positions_1.LinkPositions(event.id, event.x, event.y, shapeTo.width, shapeTo.height);
            if (shapeFrom.y < shapeTo.y) {
                var linkPosition = linkPositions.bottom;
            }
            else {
                var linkPosition = linkPositions.top;
            }
            if (shapeTo.y < shapeFrom.y) {
                var linkPosition = linkPositions.bottom;
            }
            else {
                var linkPosition = linkPositions.top;
            }
            this.link.xTo = linkPosition.x;
            this.link.yTo = linkPosition.y;
        }
    };
    TreeCanvas.prototype.setLink = function (shapeIdFrom, shapeIdTo) {
        var shapeFrom = this.getShape(shapeIdFrom);
        var shapeTo = this.getShape(shapeIdTo);
        var shapeFromLinkPositions = new link_positions_1.LinkPositions(shapeFrom.id, shapeFrom.x, shapeFrom.y, shapeFrom.width, shapeFrom.height);
        var shapeToLinkPositions = new link_positions_1.LinkPositions(shapeTo.id, shapeTo.x, shapeTo.y, shapeTo.width, shapeTo.height);
        this.calcLinkCoordinates(shapeFromLinkPositions, shapeToLinkPositions);
    };
    TreeCanvas.prototype.calcLinkCoordinates = function (shapeFromLinkPositions, shapeToLinkPositions) {
        this.link = new Link();
        this.link.xFrom = shapeFromLinkPositions.bottom.x;
        this.link.yFrom = shapeFromLinkPositions.bottom.y;
        this.link.xTo = shapeToLinkPositions.top.x;
        this.link.yTo = shapeToLinkPositions.top.y;
    };
    return TreeCanvas;
}());
TreeCanvas = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tree-canvas',
        templateUrl: 'tree-canvas.component.html',
        styleUrls: ['tree-canvas.component.css'],
    }),
    __metadata("design:paramtypes", [])
], TreeCanvas);
exports.TreeCanvas = TreeCanvas;
//# sourceMappingURL=tree-canvas.component.js.map