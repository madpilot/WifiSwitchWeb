import 'regenerator-runtime/runtime';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import assertJsx, { options } from 'preact-jsx-chai';
import { h, render } from 'preact';
import jsdom from 'jsdom';

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
global.render = render;
global.sleep = ms => new Promise( resolve => setTimeout(resolve, ms) );

// Setup JSDOM
var doc = jsdom.jsdom("<!doctype html><html><body></body></html>");
var win = doc.defaultView;

global.document = doc;
global.window = win;

for(var key in win) {
  if(!win.hasOwnProperty(key)) continue;
  if(key in global) continue;

  global[key] = win[key];
}
