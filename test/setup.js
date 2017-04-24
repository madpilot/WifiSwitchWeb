import 'regenerator-runtime/runtime';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import assertJsx, { options } from 'preact-jsx-chai';
import { h } from 'preact';

// when checking VDOM assertions, don't compare functions, just nodes and attributes:
options.functions = false;

// activate the JSX assertion extension:
chai.use(assertJsx);
chai.use(sinonChai);

delete global.expect;
global.NODE_ENV = 'test';
global.chai = chai;
global.expect = chai.expect;
global.sinon = sinon;
global.h = h;
global.sleep = ms => new Promise( resolve => setTimeout(resolve, ms) );
