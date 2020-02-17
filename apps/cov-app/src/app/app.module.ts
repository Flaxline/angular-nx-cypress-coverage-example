import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UiLibModule } from '@coverage-workspace/ui-lib'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, UiLibModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
