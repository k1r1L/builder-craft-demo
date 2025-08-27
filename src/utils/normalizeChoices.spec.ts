import { it, expect, describe } from 'vitest';
import { normalizeChoices } from "./normalizeChoices";

describe('normalizeChoices', () => {
  it('dedupes and trims lines', () => {
    expect(normalizeChoices(" Asia \n\nAsia\nEurope ")).toEqual(["Asia", "Europe"]);
  });

  it('removes blanks', () => {
    expect(normalizeChoices("One\n\nTwo")).toEqual(["One", "Two"]);
  });
});