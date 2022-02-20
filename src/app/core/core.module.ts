import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { provideHttpInterceptors } from './services/interceptors';
import { ProgressService } from './services/progress';

const COMPONENTS = [PageNotFoundComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [HttpClientModule],
  exports: [...COMPONENTS],
  providers: [provideHttpInterceptors(), ProgressService],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You should import core module only in the root module');
    }
  }
}
