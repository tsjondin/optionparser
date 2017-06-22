"use strict";

import {suite, test} from "mocha-typescript";
import {expect} from 'chai';
import {provider} from './decorators';

import {
  OptionParser,
  NumberOption
} from "../index";

function number_test_provider () {
  return [
    ["t", "test", ["-t", "1.3"], 1.3],
    ["t", "test", ["--test", "1.4"], 1.4]
  ];
}

@suite("Test number options")
export class NumberOptionTester {

  @provider(number_test_provider)
  @test "Options are correctly parsed from arguments"
  (shortopt : string, longopt : string, cli : Array<string>, value : number) {

    const parser = new OptionParser("NumberOption Test",
      new NumberOption(shortopt, longopt)
    );

    const options : any = parser.parse(['bin', 'test', ...cli]);
    expect(options.test.get_value()).to.equal(value);

  }

}

