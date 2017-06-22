"use strict";

import {Option} from './option';

export class NumberOption extends Option<number> {

  public set_value (value : string) : void {
    this.value = parseFloat(value);
  }

}
