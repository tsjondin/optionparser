"use strict";

import {suite, test} from "mocha-typescript";
import {expect} from 'chai';
import {provider} from './decorators';

import {
  OptionParser,
  IntegerOption
} from "../index";

function integer_test_provider () {
  return [
    ["t", "test", ["-t", "1"], 1],
    ["t", "test", ["--test", "2"], 2]
  ];
}

@suite("Test integer options")
export class IntegerOptionTester {

  @provider(integer_test_provider)
  @test "Options are correctly parsed from arguments"
  (shortopt : string, longopt : string, cli : Array<string>, value : number) {

    const parser = new OptionParser("IntegerOption Test",
      new IntegerOption(shortopt, longopt)
    );

    const options : any = parser.parse(['bin', 'test', ...cli]);
    expect(options.test.get_value()).to.equal(value);

  }

}
