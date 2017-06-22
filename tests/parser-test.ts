"use strict";

import {suite, test} from "mocha-typescript";
import {expect} from 'chai';
//import {provider} from './decorators';

import {
  OptionParser,
  OptionInvalidKeyError,
  StringOption,
  FlagOption,
  ListOption
} from "../index";

/*
function parser_result_provider () {
  return [
    [
      new FlagOption(),
      new StringOption()
    ]
  ];
}*/

@suite("Test OptionParser")
export class ParserTester {

  @test "Long option name is used if no destination is set"
  () {

    const parser = new OptionParser("FlagOption Test",
      new StringOption("s", "string")
    );

    const options : any = parser.parse(['bin', 'test'],);
    expect(Object.keys(options)).to.include.members(['string']);

  }

  @test "Destination overrides long option as name"
  () {

    const parser = new OptionParser("FlagOption Test",
      new StringOption("s", "string", {destination: "foobar"})
    );

    const options : any = parser.parse(['bin', 'test']);
    expect(Object.keys(options)).to.include.members(["foobar"]);

  }

  @test "Has a default help flag"
  () {
    const parser = new OptionParser("FlagOption Test");
    const options : any = parser.parse(['bin', 'test']);
    expect(Object.keys(options)).to.have.members(['help']);
  }

  @test "Resulting object contains all options given"
  () {

    const parser = new OptionParser("FlagOption Test",
      new StringOption("s", "string"),
      new FlagOption("f", "flag"),
      new ListOption("l", "list")
    );

    const options : any = parser.parse(['bin', 'test']);
    expect(Object.keys(options)).to.include.members(['string', 'flag', 'list']);

  }

  @test "Invalid key throws OptionInvalidKeyError" () {

    const parser = new OptionParser("StringOption Test");

    expect(parser.parse.bind(parser, ["bin", "test", "--test"]))
      .to.throw(OptionInvalidKeyError);

  }


    /*
  @provider(parser_result_provider)
  @test "Options are correctly parsed from arguments"
  (shortopt : string, longopt : string, cli : string, value : any) {

    const parser = new OptionParser("FlagOption Test",
      new FlagOption(shortopt, longopt)
    );

    const options : any = parser.parse(['bin', 'test', cli]);
    expect(options.test.get_value()).to.equal(value);

  }*/

}

