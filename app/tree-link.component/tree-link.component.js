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
var TreeLink = (function () {
    function TreeLink(parent) {
        this.parent = parent;
        this.fill = '#CFFFCD';
        this.stroke = 'red';
        this.initCompleted = false;
        this.select = new core_1.EventEmitter();
    }
    TreeLink.prototype.ngOnInit = function () {
        this.canvas = this.parent.canvas;
        this.line = this.drawArrow(this.xFrom, this.yFrom, this.xTo, this.yTo);
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
    };
    TreeLink.prototype.ngOnDestroy = function () {
    };
    TreeLink.prototype.drawArrow = function (xFrom, yFrom, xTo, yTo) {
        var arrow = this.canvas.polygon([0, 10, 4, 10, 2, 0, 0, 10]).attr({ fill: 'blue' }).transform('r90');
        var marker = arrow.marker(0, 0, 10, 10, 0, 5);
        var line = this.canvas.line(xFrom, yFrom, xTo, yTo).attr({
            id: 'myid',
            stroke: "blue",
            strokeWidth: 1,
            markerEnd: marker
        });
        return line;
    };
    return TreeLink;
}());
TreeLink = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tree-link',
        templateUrl: 'tree-link.component.html',
        styleUrls: ['tree-link.component.css'],
        inputs: ['id', 'xFrom', 'yFrom', 'xTo', 'yTo'],
        outputs: ['select']
    }),
    __param(0, core_1.Inject(core_1.forwardRef(function () { return tree_canvas_component_1.TreeCanvas; }))),
    __metadata("design:paramtypes", [tree_canvas_component_1.TreeCanvas])
], TreeLink);
exports.TreeLink = TreeLink;
//# sourceMappingURL=tree-link.component.js.map