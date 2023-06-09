import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';



if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppComponent)
//   .catch(err => console.log(err));


bootstrapApplication(AppComponent, {

  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(
      IonicModule.forRoot({}),
      HttpClientModule,
      FormsModule,
      CommonModule
      ),
    provideRouter(routes),

  ],
});
