import { NgModule } from '@angular/core';
import { HttpModule }  from '@angular/http';
import { AppComponent } from './app.component';
import { ServerTreeComponent } from './server-tree.component';
import { BrowserModule } from '@angular/platform-browser';
import { TreeModule } from '../index';

@NgModule({
  declarations: [AppComponent, ServerTreeComponent],
  imports:      [BrowserModule, TreeModule, HttpModule],
  bootstrap:    [AppComponent]
})
export class AppModule {
}
