import { Transform } from 'class-transformer';
import { Decimal } from 'decimal.js';
import { Column, ValueTransformer } from 'typeorm';

export class DecimalTransformer implements ValueTransformer {
  to(decimal?: Decimal): string {
    return decimal?.toString();
  }

  from(decimal?: string): Decimal | null {
    return decimal ? new Decimal(decimal) : null;
  }
}

export const DecimalColumn = ({
  precision,
  scale,
  nullable = false,
}: {
  precision: number;
  scale: number;
  nullable?: boolean;
}) => {
  const columnFn = Column('decimal', {
    precision,
    scale,
    nullable,
    transformer: new DecimalTransformer(),
  });

  const tfFn = Transform(({ value }) => value?.toNumber(), {
    toPlainOnly: true,
  });

  return function (target: any, key: string) {
    columnFn(target, key);
    tfFn(target, key);
  };
};
