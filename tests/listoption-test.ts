"use strict";

import {suite, test} from "mocha-typescript";
import {expect} from 'chai';
import {provider} from './decorators';

import {
  OptionParser,
  ListOption
} from "../index";

function list_test_provider () {
  return [
    ["t", "test", ["-t", "value1"], ["value1"]],
    ["t", "test", ["-t", "value1", "-t", "value2"], ["value1", "value2"]]
  ];
}

@suite("Test flag options")
export class ListOptionTester {

  @provider(list_test_provider)
  @test "Options are correctly parsed from arguments"
  (shortopt : string, longopt : string, cli : Array<string>, value : Array<string>) {

    const parser = new OptionParser("ListOption Test",
      new ListOption(shortopt, longopt)
    );

    const options : any = parser.parse(['bin', 'test', ...cli]);
    expect(options.test.get_value()).to.deep.equal(value);

  }

}

