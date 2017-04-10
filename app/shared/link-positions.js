"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LinkPosition = (function () {
    function LinkPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    return LinkPosition;
}());
exports.LinkPosition = LinkPosition;
var LinkPositions = (function () {
    function LinkPositions(id, x, y, width, height) {
        this.id = id;
        this.top = this.getTopPosition(x, y, width, height);
        this.bottom = this.getBottomPosition(x, y, width, height);
        this.left = this.getLeftPosition(x, y, width, height);
        this.right = this.getRightPosition(x, y, width, height);
    }
    LinkPositions.prototype.getTopPosition = function (x, y, width, height) {
        return new LinkPosition(Math.round(x + width / 2), y);
    };
    LinkPositions.prototype.getBottomPosition = function (x, y, width, height) {
        return new LinkPosition(Math.round(x + width / 2), y + height);
    };
    LinkPositions.prototype.getLeftPosition = function (x, y, width, height) {
        return new LinkPosition(x, Math.round(y + height / 2));
    };
    LinkPositions.prototype.getRightPosition = function (x, y, width, height) {
        return new LinkPosition(x + width, Math.round(y + height / 2));
    };
    return LinkPositions;
}());
exports.LinkPositions = LinkPositions;
//# sourceMappingURL=link-positions.js.map