import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  public operationOccurred = new Subject<any>();
  constructor() {}

  nexdata(value: any) {
    this.operationOccurred.next(value);
  }
  onDataChange() {
    return this.operationOccurred.asObservable();
  }
}
