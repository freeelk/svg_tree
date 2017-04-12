import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TreeCanvas } from './tree-canvas.component/tree-canvas.component';
import { TreeShape } from './tree-shape.component/tree-shape.component';
import { TreeLink } from './tree-link.component/tree-link.component';
import { TreeToolbox } from './tree-toolbox.component/tree-toolbox.component';
import { TreeService } from "./services/tree.service";

@NgModule ({
    imports: [ BrowserModule ],
    declarations: [ AppComponent, TreeCanvas, TreeShape, TreeLink, TreeToolbox ],
    bootstrap: [ AppComponent ],
    providers: [TreeService],
})
export class AppModule { }




