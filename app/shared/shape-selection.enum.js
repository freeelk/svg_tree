"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *  Возможные состояния объекта
 *     - None не выбрано
 *     - Selected Выбрано одинарным щелчком. Для просмотра/изменения свойств, кдаления
 *     - Activated Выбрано двойным щелчком. Активировано для добавления/удаления связей
 */
var ShapeSelection;
(function (ShapeSelection) {
    ShapeSelection[ShapeSelection["None"] = 0] = "None";
    ShapeSelection[ShapeSelection["Selected"] = 1] = "Selected";
    ShapeSelection[ShapeSelection["Activated"] = 2] = "Activated";
})(ShapeSelection = exports.ShapeSelection || (exports.ShapeSelection = {}));
//# sourceMappingURL=shape-selection.enum.js.map