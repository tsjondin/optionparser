"use strict";

import {test} from 'mocha-typescript';

export function provider (dataprovider : () => Array<Array<any>>) : Function {

  return (target : any, propertyKey : string, descriptor : PropertyDescriptor) : void => {

    let data = dataprovider();

    /**
     * The original method will be monkeypatched to be applied for each entry
     * in the providers data
     */
    let original = target[propertyKey];

    /**
     * Remove the original so that it is not invoked without arguments
     */
    delete target[propertyKey];

    /**
     * Add methods for each entry in the data from the provider.
     */
    data.forEach((item : Array<any>, index : number) => {
      let key = `${propertyKey} #${index}: ${JSON.stringify(item)}`
      target[key] = original.bind(target, ...item);
      test(key)(target, key, descriptor);
    });

  }
}
