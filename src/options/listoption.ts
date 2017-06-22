"use strict";

import {Option} from './option';

type ListValue = Array<string>;

export class ListOption extends Option<ListValue> {

  readonly requires_value : boolean = false;

  public set_value (value : string) : void {
    if (!this.value) {
      this.value = [];
    }
    this.value.push(value);
  }

}

