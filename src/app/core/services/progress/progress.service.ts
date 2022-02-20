import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ProgressService {
  private _displayProgressSpinner$ = new BehaviorSubject<boolean>(false);

  set displayProgressSpinner(isDisplayProgressSpinner: boolean) {
    setTimeout(() => {
      this._displayProgressSpinner$.next(isDisplayProgressSpinner);
    });
  }

  get isDisplayProgressSpinner$(): Observable<boolean> {
    return this._displayProgressSpinner$;
  }
}
