import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  public operationOccurred = new Subject<any>();
  public focusControl = new Subject<any>();
  constructor() {}

  //* bottomComponent -> MiddleComponent
  nextdata(value: any) {
    this.operationOccurred.next(value);
  }
  onDataChange() {
    return this.operationOccurred.asObservable();
  }

  //* MiddleComponent -> bottomComponent
  nextDataFocus(value: boolean) {
    this.focusControl.next(value);
  }
  onDataChangeFocus() {
    return this.focusControl.asObservable();
  }
}
