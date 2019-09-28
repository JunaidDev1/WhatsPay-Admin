import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollectionDataService {

  public allUsers: any = [];

  constructor() { }
}
