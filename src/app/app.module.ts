import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { GridComponent } from './components/grid/grid.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LawnMownComponent } from './components/grid/lawn-mown/lawn-mown.component';

const appRoutes: Routes = [
  { path: 'grid', component: GridComponent },
  { path: '', component:  LoaderComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    LoaderComponent,
    LawnMownComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RouterModule.forRoot(appRoutes)
    // HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
