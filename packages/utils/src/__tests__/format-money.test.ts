import { formatMoney } from "../format-money";

describe("UTILS: Format Money", () => {
  it("returns a formatted currency string", () => {
    const number = 1234.45;
    const expectedResult = "$1,234.45";

    const formattedResult = formatMoney(number, "USD", "en-US", 2);

    expect(formattedResult).toStrictEqual(expectedResult);
    expect(formattedResult).not.toBe(number);
  });
});
