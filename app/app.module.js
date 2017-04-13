"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var tree_canvas_component_1 = require("./tree-canvas.component/tree-canvas.component");
var tree_shape_component_1 = require("./tree-shape.component/tree-shape.component");
var tree_link_component_1 = require("./tree-link.component/tree-link.component");
var tree_toolbox_component_1 = require("./tree-toolbox.component/tree-toolbox.component");
var node_data_component_1 = require("./node-data.component/node-data.component");
var tree_service_1 = require("./services/tree.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule],
        declarations: [app_component_1.AppComponent, tree_canvas_component_1.TreeCanvas, tree_shape_component_1.TreeShape, tree_link_component_1.TreeLink, tree_toolbox_component_1.TreeToolbox, node_data_component_1.NodeData],
        bootstrap: [app_component_1.AppComponent],
        providers: [tree_service_1.TreeService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map