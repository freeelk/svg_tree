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
        this.top = new LinkPosition(Math.round(x + width / 2), y);
        this.bottom = new LinkPosition(Math.round(x + width / 2), y + height);
        this.left = new LinkPosition(x, Math.round(y + height / 2));
        this.right = new LinkPosition(x + width, Math.round(y + height / 2));
    }
    return LinkPositions;
}());
exports.LinkPositions = LinkPositions;
//# sourceMappingURL=link-positions.js.map