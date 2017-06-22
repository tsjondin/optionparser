"use strict";

import {Option} from './option';

export class FlagOption extends Option<boolean> {

  readonly requires_value : boolean = false;

  public set_value (value : string) : void {
    this.value = (value) ? true : false;
  }

}

