import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { TreeModule } from '../../../index';
import { ButtonDirective } from './button';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, ButtonDirective],
  imports: [BrowserModule, CommonModule, TreeModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
