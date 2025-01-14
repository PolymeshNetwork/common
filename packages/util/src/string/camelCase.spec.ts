// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { stringCamelCase } from '.';

describe('stringCamelCase', (): void => {
  it('works correctly', (): void => {
    expect(
      stringCamelCase('Snake_case-Something    spaced')
    ).toBe('snakeCaseSomethingSpaced');
  });

  it('works correctly for String (class', (): void => {
    expect(
      stringCamelCase(String('Foo_bar-baz---test'))
    ).toBe('fooBarBazTest');
  });
});
