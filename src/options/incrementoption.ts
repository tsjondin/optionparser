"use strict";

import {Option} from './option';

export class IncrementOption extends Option<number> {

  readonly requires_value : boolean = false;

  public set_value () : void {

    if (!this.value) {
      this.value = 0;
    }

    this.value++;

  }

}

