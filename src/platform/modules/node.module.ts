import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UniversalModule, isBrowser, isNode } from 'angular2-universal/node'; // for AoT we need to manually split universal packages

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { AppModule, AppComponent } from '../../app/app.module';
import { SharedModule } from '../../app/shared/shared.module';
import { CoreModule } from "../../app/core/core.module";

import { StoreModule, Store } from "@ngrx/store";
import { RouterStoreModule } from "@ngrx/router-store";
import { rootReducer, AppState, NGRX_CACHE_KEY } from '../../app/app.reducers';
import { effects } from '../../app/app.effects';

// Will be merged into @angular/platform-browser in a later release
// see https://github.com/angular/angular/pull/12322
import { Meta } from '../angular2-meta';

import { GLOBAL_CONFIG, EnvConfig } from '../../config';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}

export function getLRU() {
  return new Map();
}
export function getRequest() {
  return Zone.current.get('req') || {};
}
export function getResponse() {
  return Zone.current.get('res') || {};
}

export const UNIVERSAL_KEY = 'UNIVERSAL_CACHE';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    NgbModule.forRoot(),

    UniversalModule, // BrowserModule, HttpModule, and JsonpModule are included

    FormsModule,
    RouterModule.forRoot([], { useHash: false }),

    CoreModule.forRoot(),
    SharedModule,
    AppModule,
    StoreModule.provideStore(rootReducer),
    RouterStoreModule.connectRouter(),
    effects
  ],
  providers: [
    { provide: GLOBAL_CONFIG, useValue: EnvConfig },

    { provide: 'isBrowser', useValue: isBrowser },
    { provide: 'isNode', useValue: isNode },

    { provide: 'req', useFactory: getRequest },
    { provide: 'res', useFactory: getResponse },

    { provide: 'LRU', useFactory: getLRU, deps: [] },

    Meta

  ]
})
export class MainModule {
  constructor(public store: Store<AppState>) {

  }

  /**
   * We need to use the arrow function here to bind the context as this is a gotcha
   * in Universal for now until it's fixed
   */
  universalDoDehydrate = (universalCache) => {
    this.store.take(1).subscribe(state => {
      universalCache[NGRX_CACHE_KEY] = state;
    });
  };

  /**
   * Clear the cache after it's rendered
   */
  universalAfterDehydrate = () => {
    // comment out if LRU provided at platform level to be shared between each user
    // this.cache.clear();
    //TODO  is this necessary in dspace's case?
  }
}
