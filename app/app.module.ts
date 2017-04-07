import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TreeCanvas } from './tree-canvas.component/tree-canvas.component';
import { TreeShape } from './tree-shape.component/tree-shape.component';
import { TreeLink } from './tree-link.component/tree-link.component';

@NgModule ({
    imports: [ BrowserModule ],
    declarations: [ AppComponent, TreeCanvas, TreeShape, TreeLink ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }




