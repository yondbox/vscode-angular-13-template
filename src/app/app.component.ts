import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProgressService } from './core/services/progress';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-project-template';

  isDisplayProgressSpinner$: Observable<boolean> = this.progress.isDisplayProgressSpinner$;

  constructor(private progress: ProgressService) {}
}
