# svg_tree
Test creating tree with svg


Добавил в конец файла node_modules/@types/snapsvg/index.d.ts

declare module "snapsvg" {
export = Snap;
}

Справка: https://forum.ionicframework.com/t/cannot-import-snap-svg-into-typescript/58409/9