import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { TreeModule } from '../index';

@NgModule({
  declarations: [AppComponent],
  imports:      [BrowserModule, TreeModule],
  bootstrap:    [AppComponent]
})
export class AppModule {
}
