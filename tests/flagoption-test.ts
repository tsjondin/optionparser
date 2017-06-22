"use strict";

import {suite, test} from "mocha-typescript";
import {expect} from 'chai';
import {provider} from './decorators';

import {
  OptionParser,
  FlagOption
} from "../index";

function flag_test_provider () {
  return [
    ["t", "test", "-t", true],
    ["t", "test", "--test", true],
    ["t", "test", "", undefined]
  ];
}

@suite("Test flag options")
export class FlagOptionTester {

  @provider(flag_test_provider)
  @test "Options are correctly parsed from arguments"
  (shortopt : string, longopt : string, cli : string, value : any) {

    const parser = new OptionParser("FlagOption Test",
      new FlagOption(shortopt, longopt)
    );

    const options : any = parser.parse(['bin', 'test', cli]);
    expect(options.test.get_value()).to.equal(value);

  }

}

