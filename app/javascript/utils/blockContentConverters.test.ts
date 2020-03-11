import {convertCodeBlockStringToObject} from "./blockContentConverters"


test('Code Content String Converter', () => {
    let contentString = "ruby\nclass TestClass < CoolClass\n  def initialize\n   puts 'Hello World'\nend\nend";
    let result = convertCodeBlockStringToObject(contentString);
    expect(result).toStrictEqual({language: "ruby", code:"class TestClass < CoolClass\n  def initialize\n   puts 'Hello World'\nend\nend" })
});