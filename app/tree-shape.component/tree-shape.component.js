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
var snap = require("snapsvg");
var TreeShape = (function () {
    function TreeShape(parent) {
        this.parent = parent;
        this.rx = 5;
        this.ry = 5;
        this.fillColors = { reward: '#dedede', operator: '#9FD19B', filter: '#94CAFF', applicator: '#F66622' };
        this.fill = '#CFFFCD';
        this.stroke = 'red';
        this.initCompleted = false;
        this.select = new core_1.EventEmitter();
        this.move = new core_1.EventEmitter();
    }
    TreeShape.prototype.ngOnInit = function () {
        this.canvas = this.parent.canvas;
        var box = this.canvas.rect(this.x, this.y, this.width, this.height, this.rx, this.ry).attr({ fill: this.fillColors[this.type], stroke: this.stroke });
        var textId = this.canvas.text(this.x + 5, this.y + 35, this.id).attr({ 'font-size': 15 });
        var textType = this.canvas.text(this.x + 5, this.y + 15, this.type).attr({ 'font-size': 12 });
        this.shape = this.canvas.g(box, textId, textType);
        this.shape.attr({ id: this.id });
        if (this.selected) {
            this.shape.attr({ strokeWidth: 1 });
        }
        else {
            this.shape.attr({ strokeWidth: 0 });
        }
        var that = this;
        this.shape.click(function (event) {
            that.selected = true;
            that.select.emit(that.id);
        });
        this.shape.dblclick(function (event) {
            that.shape.attr({ 'stroke-dasharray': '5' });
            snap.animate(0, 60, function (value) {
                that.shape.attr({ 'stroke-dashoffset': value * 10 });
            }, 20000);
        });
        this.shape.drag(function (dx, dy) {
            this.attr({
                transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
            });
            var bBox = that.shape.getBBox();
            that.x = bBox.x;
            that.y = bBox.y;
            that.move.emit({ id: that.id, x: bBox.x, y: bBox.y });
        }, function () {
            //Move start
            this.data('origTransform', this.transform().local);
        }, function () {
            //Move end
        });
        this.initCompleted = true;
    };
    TreeShape.prototype.ngOnChanges = function (changes) {
        if (!this.initCompleted) {
            return;
        }
        if (changes['selected']) {
            if (changes['selected'].currentValue == true) {
                this.shape.attr({ strokeWidth: 1 });
            }
            else {
                this.shape.attr({ strokeWidth: 0 });
            }
        }
    };
    TreeShape.prototype.ngOnDestroy = function () {
        console.log('destroy ' + this.id);
        this.shape.remove();
    };
    TreeShape.prototype.getLinkPositions = function () {
        if (this) {
            return new link_positions_1.LinkPositions(this.id, this.x, this.y, this.width, this.height);
        }
    };
    return TreeShape;
}());
TreeShape = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tree-shape',
        templateUrl: 'tree-shape.component.html',
        styleUrls: ['tree-shape.component.css'],
        inputs: ['id', 'type', 'x', 'y', 'width', 'height', 'fill', 'selected'],
        outputs: ['select', 'move']
    }),
    __param(0, core_1.Inject(core_1.forwardRef(function () { return tree_canvas_component_1.TreeCanvas; }))),
    __metadata("design:paramtypes", [tree_canvas_component_1.TreeCanvas])
], TreeShape);
exports.TreeShape = TreeShape;
//# sourceMappingURL=tree-shape.component.js.map