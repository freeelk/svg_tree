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
var NodeData = (function () {
    function NodeData() {
        this.dataChange = new core_1.EventEmitter();
    }
    NodeData.prototype.ngOnInit = function () {
    };
    NodeData.prototype.ngOnDestroy = function () {
    };
    NodeData.prototype.onChanges = function (event) {
        this.data.name = event.target.value;
        this.dataChange.emit(this.data);
    };
    return NodeData;
}());
NodeData = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'node-data',
        templateUrl: 'node-data.component.html',
        styleUrls: ['node-data.component.css'],
        inputs: ['data'],
        outputs: ['dataChange']
    }),
    __metadata("design:paramtypes", [])
], NodeData);
exports.NodeData = NodeData;
//# sourceMappingURL=node-data.component.js.map