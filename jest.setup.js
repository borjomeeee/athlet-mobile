import {jest} from '@jest/globals';
import {XMLHttpRequest} from 'xmlhttprequest';

import {setUpTests} from 'react-native-reanimated/lib/reanimated2/jestUtils';

global.self = global;
global.window = global;
global.XMLHttpRequest = XMLHttpRequest;

setUpTests();

jest.doMock('recoil', () => require('recoil/native/recoil'));

if (!global.Window) {
  Object.defineProperty(global, 'Window', {
    value: window.constructor,
    writable: true,
    enumerable: true,
    configurable: true,
  });
}
