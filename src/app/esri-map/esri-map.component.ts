import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { promise } from 'selenium-webdriver';
import { EsriMapService } from 'angularx-esri-components/src/lib/core';
import { EsriModuleProvider } from 'angularx-esri-components/src/lib/core';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})

export class EsriMapComponent implements OnInit {
  webMapProperties: __esri.WebMapProperties = {
    //  basemap: 'dark-gray'
    portalItem: {
      id: 'ad5759bf407c4554b748356ebe1886e5'
    }

  };

  mapViewProperties: __esri.MapViewProperties = {
    zoom: 4,
  };

  map: __esri.Map;
  mapView: __esri.MapView;
  testInfo: string;
  prop: __esri.Collection<__esri.FeatureLayerSource> ;

  constructor(private mapService: EsriMapService, private moduleProvider: EsriModuleProvider) {
    this.testInfo = 'No Info yet';
  }

  ngOnInit() {
  }

  getLayerCount(map: __esri.Map): Number {
    return map.allLayers.length;
  }

  loadMapLayerCount(watchUtils: __esri.watchUtils) {
    const orig = this;
    watchUtils.whenOnce(this.map, 'allLayers.length', function(newValue, oldValue, property, object) {
    console.log('New value: ', newValue,      // The new value of the property
                '<br>Old value: ', oldValue,  // The previous value of the changed property
                '<br>Watched property: ', property,  // In this example this value will always be "basemap.title"
                '<br>Watched object: ', object);     // In this example this value will always be the map object
                orig.testInfo = String(orig.getLayerCount(orig.map));
              });
  }

  onMapInit(mapInfo: {map: __esri.Map, mapView: __esri.MapView}) {
    this.map = mapInfo.map;
    this.mapView = mapInfo.mapView;

    this.moduleProvider.require(['esri/core/watchUtils'])
      .then(([watchUtils]) => {
          this.loadMapLayerCount(watchUtils);
      });


    this.moduleProvider.require(['esri/widgets/Search'])
      .then(([Search]: [__esri.SearchConstructor]) => {
          const props = [{
            locator: { url: 'https://services.arcgisonline.nl/arcgis/rest/services/Geocoder_BAG_RD/GeocodeServer' },
            singleLineFieldName: 'SingleLine',
            outFields: ['Adres', 'Postcode'],
            name: 'test',
            placeholder: 'test placeholder',
          }];
          this.ComposeSearch(Search, props);
      });
   }

  private ComposeSearch(Search: __esri.SearchConstructor, prop: Array<any>) {
    const search = new Search( {
        view: this.mapView,
        sources: prop
       }
    );

    this.mapView.ui.add(search, {
      position: 'top-left',
      index: 2
    });
  }
}
