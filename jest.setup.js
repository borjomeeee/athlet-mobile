import {jest} from '@jest/globals';

global.self = global;
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

jest.doMock('recoil', () => require('recoil/native/recoil'));
jest.doMock('@borjomeeee/rn-styles', () => require('__mocks__/rn-styles'));
