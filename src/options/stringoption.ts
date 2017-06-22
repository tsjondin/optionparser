"use strict";

import {Option} from './option';

export class StringOption extends Option<string> {

  public set_value (value : string) : void {
    this.value = value;
  }

}
