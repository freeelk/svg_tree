import { ShapeSelection } from '../shared/shape-selection.enum';
import { TreeNodeData } from '../shared/tree-node-data';

export class Shape {
    id: string;
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    selected: ShapeSelection;
    data: TreeNodeData;
}