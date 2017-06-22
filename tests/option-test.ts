"use strict";

import {suite, test} from "mocha-typescript";
import {expect} from 'chai';
import {provider} from './decorators';

import {
  OptionParser,
  OptionInterface,
  FlagOption,
  StringOption,
  NumberOption,
  IntegerOption,
  IncrementOption,
  ListOption
} from "../index";

function option_generic_provider () {
  return [
    [new FlagOption('t', 'test')],
    [new StringOption('t', 'test')],
    [new NumberOption('t', 'test')],
    [new IntegerOption('t', 'test')],
    [new IncrementOption('t', 'test')],
    [new ListOption('t', 'test')]
  ];
}

@suite("Test flag options")
export class FlagOptionTester {

  @provider(option_generic_provider)
  @test "Missing option results in 'undefined' value"
  (option : OptionInterface) {

    const parser = new OptionParser("Option Test Test", option);
    const options : any = parser.parse(['bin', 'test']);
    expect(options[option.get_name()].get_value()).to.equal(undefined);

  }

  @test "given callback to setting it is invoked when running get_value"
  () {
    let option = new StringOption('t', 'test', {
      callback: (value : string) => (value + "-suffixed")
    });
    option.set_value("the-value");
    expect(option.get_value()).to.equal("the-value-suffixed");
  }

  @test "get_shortopt returns given shortopt"
  () {
    let option = new StringOption('t', 'test');
    expect(option.get_shortopt()).to.equal("t");
  }

  @test "get_longopt returns given longopt"
  () {
    let option = new StringOption('t', 'test');
    expect(option.get_longopt()).to.equal("test");
  }

  @test "No help available returns empty string from get_help"
  () {
    let option = new StringOption('t', 'test');
    expect(option.get_help()).to.equal("");
  }

  @test "Setting help return the given help string from get_help"
  () {
    let option = new StringOption('t', 'test', {help: "This is now my help"});
    expect(option.get_help()).to.equal("This is now my help");
  }

}

