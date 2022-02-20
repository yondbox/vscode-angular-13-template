import { NgModule } from '@angular/core';
import { ProgressSpinnerComponent } from './components';
import { MaterialModule } from './material';

const COMPONENTS = [ProgressSpinnerComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [MaterialModule],
  exports: [...COMPONENTS],
  entryComponents: [ProgressSpinnerComponent],
})
export class SharedModule {}
