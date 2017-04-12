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
var snap = require("snapsvg");
var TreeToolbox = (function () {
    function TreeToolbox() {
        this.x = 5;
        this.y = 5;
        this.width = 110;
        this.height = 150;
        this.rx = 0;
        this.ry = 0;
        this.fill = '#CFFFCD';
        this.stroke = 'red';
        this.fillColors = { reward: '#dedede', operator: '#9FD19B', filter: '#94CAFF', applicator: '#F66622' };
        this.shapes = [
            { id: 'toolbox-0', type: "reward", x: 10, y: 10, width: 100, height: 40, selected: false },
            { id: 'toolbox-1', type: "operator", x: 10, y: 60, width: 100, height: 40, selected: false },
            { id: 'toolbox-5', type: "applicator", x: 10, y: 110, width: 100, height: 40, selected: false }
        ];
        this.create = new core_1.EventEmitter();
    }
    TreeToolbox.prototype.ngOnInit = function () {
        var _this = this;
        this.canvas = snap('#tree-canvas');
        var box = this.canvas.rect(this.x, this.y, this.width, this.height, this.rx, this.ry).attr({ fill: this.fill, strokeWidth: 0 });
        var that = this;
        this.shapes.forEach(function (shape) {
            var rect = _this.canvas.rect(shape.x, shape.y, shape.width, shape.height, 5, 5).attr({ fill: _this.fillColors[shape.type], strokeWidth: 0 });
            var textType = _this.canvas.text(shape.x + 5, shape.y + 15, shape.type).attr({ 'font-size': 12 });
            var tbShape = _this.canvas.g(rect, textType);
            var that1 = that;
            tbShape.drag(function (dx, dy) {
                this.attr({
                    transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
                });
            }, function () {
                //Move start
                this.data('origTransform', this.transform().local);
            }, function () {
                var bBox = this.getBBox();
                that.create.emit({ id: '', type: shape.type, x: bBox.x, y: bBox.y, width: 100, height: 40, selected: false });
                this.attr({
                    transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [0, 0]
                });
            });
        });
    };
    return TreeToolbox;
}());
TreeToolbox = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tree-toolbox',
        templateUrl: 'tree-toolbox.component.html',
        styleUrls: ['tree-toolbox.component.css'],
        outputs: ['create']
    }),
    __metadata("design:paramtypes", [])
], TreeToolbox);
exports.TreeToolbox = TreeToolbox;
//# sourceMappingURL=tree-toolbox.component.js.map