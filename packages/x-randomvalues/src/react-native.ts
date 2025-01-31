// Copyright 2017-2021 @polkadot/x-randomvalues authors & contributors
// SPDX-License-Identifier: Apache-2.0

// Adapted from https://github.com/LinusU/react-native-get-random-values/blob/85f48393821c23b83b89a8177f56d3a81dc8b733/index.js
// Copyright (c) 2018, 2020 Linus Unnebäck
// SPDX-License-Identifier: MIT

import { NativeModules } from 'react-native';

import { xglobal } from '@polkadot/x-global';

import { insecureRandomValues } from './fallback';

export { packageInfo } from './packageInfo';

interface RNExt {
  RNGetRandomValues: {
    getRandomBase64: (length: number) => string;
  }
}

function getRandomValuesNative <T extends Uint8Array> (output: T): T {
  const bytes = Buffer.from((NativeModules as RNExt).RNGetRandomValues.getRandomBase64(output.length), 'base64');

  for (let i = 0; i < bytes.length; i++) {
    output[i] = bytes[i];
  }

  return output;
}

function getRandomValuesGlobal <T extends Uint8Array> (output: T): T {
  return crypto.getRandomValues(output);
}

export const getRandomValues = (
  typeof xglobal.crypto === 'object' && typeof xglobal.crypto.getRandomValues === 'function'
    ? getRandomValuesGlobal
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-explicit-any
    : (typeof (xglobal as any).nativeCallSyncHook === 'undefined' || !NativeModules.ExpoRandom)
      ? insecureRandomValues
      : getRandomValuesNative
);
