import {jest} from '@jest/globals';
import {XMLHttpRequest} from 'xmlhttprequest';

global.self = global;
global.XMLHttpRequest = XMLHttpRequest;

jest.doMock('recoil', () => require('recoil/native/recoil'));
jest.doMock('@borjomeeee/rn-styles', () => require('__mocks__/rn-styles'));
