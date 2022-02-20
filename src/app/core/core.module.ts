import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { provideHttpInterceptors } from './services/interceptors';
import { ProgressService } from './services/progress';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  providers: [provideHttpInterceptors(), ProgressService],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You should import core module only in the root module');
    }
  }
}
