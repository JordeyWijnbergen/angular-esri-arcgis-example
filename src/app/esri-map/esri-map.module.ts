import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EsriMapComponent } from './esri-map.component';

import { AngularEsriModule } from 'angularx-esri-components';

@NgModule({
  imports: [
    CommonModule,
    AngularEsriModule,
  ],
  declarations: [EsriMapComponent],
  exports: [EsriMapComponent]
})
export class EsriMapModule { }
