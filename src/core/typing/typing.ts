import { Decimal as OldDecimal } from 'decimal.js';

export type Values<T extends Record<string, string>> = T[keyof T];

export type Optional<T> = T | null | undefined;

export type Newable<T> = { new (...args: any[]): T };

export class Decimal extends OldDecimal {
  static fromOptional(value?: OldDecimal.Value) {
    if (value != '0' && !value) {
      return undefined;
    }
    return new Decimal(value);
  }
}
