import { Component, OnInit,  OnChanges, OnDestroy, SimpleChange, EventEmitter } from '@angular/core';
import { Shape } from '../shared/shape';
import { ShapeSelection } from '../shared/shape-selection.enum'; 
import { TreeNodeData } from '../shared/tree-node-data';


@Component({
    moduleId: module.id,
    selector: 'node-data',
    templateUrl: 'node-data.component.html',
    styleUrls: ['node-data.component.css'],
    inputs: ['data'],
    outputs: ['dataChange']

})
export class NodeData implements OnInit, OnDestroy{
    data: TreeNodeData;

    dataChange: EventEmitter<TreeNodeData> = new EventEmitter<TreeNodeData>();

    constructor() {

    }

    ngOnInit() {
        
    }

    ngOnDestroy() {

    }

    onChanges(event) {
        this.data.name = event.target.value;
        this.dataChange.emit(this.data)
    }


}
