import { ShapeSelection } from '../shared/shape-selection.enum';

export class Shape {
    id: string;
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    selected: ShapeSelection;
}