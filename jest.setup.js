import {jest} from '@jest/globals';

global.self = global;
global.window = {};

global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

jest.doMock('recoil', () => require('recoil/native/recoil'));
jest.doMock('@borjomeeee/rn-styles', () => jest.fn(str => str));
