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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var tree_canvas_component_1 = require("../tree-canvas.component/tree-canvas.component");
var link_positions_1 = require("../shared/link-positions");
var PositionsFromTo = (function () {
    function PositionsFromTo() {
    }
    return PositionsFromTo;
}());
var TreeLink = (function () {
    function TreeLink(parent) {
        this.parent = parent;
        this.fill = 'blue';
        this.fillSelected = 'red';
        this.initCompleted = false;
        this.select = new core_1.EventEmitter();
    }
    TreeLink.prototype.ngOnInit = function () {
        this.canvas = this.parent.canvas;
        this.drawArrow(this.xFrom, this.yFrom, this.xTo, this.yTo, this.selected);
        this.update();
        var that = this;
        this.line.dblclick(function (event) {
            that.selected = true;
            that.select.emit(that.id);
        });
        this.arrow.dblclick(function (event) {
            that.selected = true;
            console.log('dbl click arrow');
            that.select.emit(that.id);
        });
        this.initCompleted = true;
    };
    TreeLink.prototype.ngOnChanges = function (changes) {
        if (!this.initCompleted) {
            return;
        }
        if (changes['xFrom']) {
            this.line.attr({ x1: changes['xFrom'].currentValue });
        }
        if (changes['yFrom']) {
            this.line.attr({ y1: changes['yFrom'].currentValue });
        }
        if (changes['xTo']) {
            this.line.attr({ x2: changes['xTo'].currentValue });
        }
        if (changes['yTo']) {
            this.line.attr({ y2: changes['yTo'].currentValue });
        }
        if (changes['selected']) {
            this.line.attr({ stroke: changes['selected'].currentValue ? this.fillSelected : this.fill, fill: changes['selected'] ? this.fillSelected : this.fill });
            this.arrow.attr({
                fill: changes['selected'].currentValue ? this.fillSelected : this.fill,
            });
        }
    };
    TreeLink.prototype.ngOnDestroy = function () {
        this.line.remove();
    };
    TreeLink.prototype.onShapeMove = function (shapeId) {
        console.log('shape move:', shapeId);
        this.update();
    };
    TreeLink.prototype.update = function () {
        var linkPositionsFromTo = this.getLinkPositionsFromTo(this.shapeFrom, this.shapeTo);
        this.line.attr({
            x1: linkPositionsFromTo.positionFrom.x,
            y1: linkPositionsFromTo.positionFrom.y,
            x2: linkPositionsFromTo.positionTo.x,
            y2: linkPositionsFromTo.positionTo.y
        });
    };
    TreeLink.prototype.getLinkPositionsFromTo = function (shapeFrom, shapeTo) {
        var LIMIT_SHAPES_DISTANCE = 120;
        var result = new PositionsFromTo;
        var linkPositionsFrom = new link_positions_1.LinkPositions(shapeFrom.id, shapeFrom.x, shapeFrom.y, shapeFrom.width, shapeFrom.height);
        var linkPositionsTo = new link_positions_1.LinkPositions(shapeTo.id, shapeTo.x, shapeTo.y, shapeTo.width, shapeTo.height);
        if (Math.abs(shapeTo.y - shapeFrom.y) < LIMIT_SHAPES_DISTANCE && Math.abs(shapeTo.x - shapeFrom.x) > LIMIT_SHAPES_DISTANCE) {
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
    TreeLink.prototype.drawArrow = function (xFrom, yFrom, xTo, yTo, selected) {
        var color = selected ? this.fillSelected : this.fill;
        this.arrow = this.canvas.polygon([0, 10, 8, 10, 4, 0, 0, 10]).attr({ fill: color }).transform('r90');
        var marker = this.arrow.marker(0, 0, 10, 10, 8, 5);
        this.line = this.canvas.line(xFrom, yFrom, xTo, yTo).attr({
            id: 'myid',
            stroke: color,
            strokeWidth: 2,
            markerEnd: marker
        });
    };
    return TreeLink;
}());
TreeLink = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tree-link',
        templateUrl: 'tree-link.component.html',
        styleUrls: ['tree-link.component.css'],
        inputs: ['id', 'xFrom', 'yFrom', 'xTo', 'yTo', 'shapeFrom', 'shapeTo', 'selected'],
        outputs: ['select']
    }),
    __param(0, core_1.Inject(core_1.forwardRef(function () { return tree_canvas_component_1.TreeCanvas; }))),
    __metadata("design:paramtypes", [tree_canvas_component_1.TreeCanvas])
], TreeLink);
exports.TreeLink = TreeLink;
//# sourceMappingURL=tree-link.component.js.map