import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { GridComponent } from './components/grid/grid.component';
import { LoaderComponent } from './components/loader/loader.component';
import { OutputComponent } from './components/output/output.component';

const appRoutes: Routes = [
  { path: 'grid', component: GridComponent },
  { path: 'output', component: OutputComponent },
  { path: '', component:  LoaderComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    LoaderComponent,
    OutputComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
