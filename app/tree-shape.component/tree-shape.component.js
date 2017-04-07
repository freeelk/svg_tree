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
var TreeShape = (function () {
    function TreeShape(parent) {
        this.parent = parent;
        this.width = 120;
        this.height = 60;
        this.rx = 0;
        this.ry = 0;
        this.fill = '#CFFFCD';
        this.stroke = 'red';
        this.initCompleted = false;
        this.select = new core_1.EventEmitter();
        this.move = new core_1.EventEmitter();
    }
    TreeShape.prototype.ngOnInit = function () {
        this.canvas = this.parent.canvas;
        this.xInit = this.x;
        this.yInit = this.y;
        this.shape = this.canvas.rect(this.x, this.y, this.width, this.height, this.rx, this.ry).attr({ fill: this.fill, stroke: this.stroke });
        this.shape.attr({ id: this.id });
        this.shape.addClass('draggable');
        if (this.selected) {
            this.shape.attr({ strokeWidth: 1 });
        }
        else {
            this.shape.attr({ strokeWidth: 0 });
        }
        var that = this;
        this.shape.dblclick(function (event) {
            that.selected = true;
            that.select.emit(that.id);
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
            this.data('origTransform', this.transform().local);
            console.log("Move started");
        }, function () {
            console.log("Move stopped");
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
        inputs: ['id', 'x', 'y', 'width', 'height', 'fill', 'selected'],
        outputs: ['select', 'move']
    }),
    __param(0, core_1.Inject(core_1.forwardRef(function () { return tree_canvas_component_1.TreeCanvas; }))),
    __metadata("design:paramtypes", [tree_canvas_component_1.TreeCanvas])
], TreeShape);
exports.TreeShape = TreeShape;
//# sourceMappingURL=tree-shape.component.js.map