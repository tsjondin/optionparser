"use strict";

import {Option} from './option';

export class IntegerOption extends Option<number> {

  public set_value (value : string) : void {
    this.value = parseInt(value, 10);
  }

}
