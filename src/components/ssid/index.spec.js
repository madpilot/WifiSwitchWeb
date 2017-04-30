import SSID from './index.js';
import { SCANNING, SCANNING_COMPLETE } from './index.js';
import { Component } from 'preact';

describe("<SSID>", () => {
  let ssid, encryption, passkey, scan, onModeChange, onChange;

  let _obj = null;
  let obj = function() {
    if(_obj == null) {
      _obj = new SSID({
        ssid, 
        encryption, 
        passkey, 
        scan, 
        onModeChange, 
        onChange
      });
    }
    return _obj;
  }

  let renderEl = function() {
    return renderHTML(obj().render());
  }

  beforeEach(() =>{
    ssid = undefined;
    encryption = undefined;
    passkey = undefined;
    scan = true;
    onModeChange = undefined
    onChange = undefined;
    _obj = null;
  });

  describe("scanning", () => {
    beforeEach(() => { scan = true });

    describe("SCANNING mode", () => {
      beforeEach(() => { obj().setState({ connection: SCANNING }) });

      it("disabled the SSID dropdown", () => {
        expect(renderEl().querySelector("select.select").disabled).to.eq(true);
      });

      it("the SSID dropdown says 'Scanning...", () => {
        expect(renderEl().querySelector("select.select > option").textContent).to.eq("Scanning…");
      });
    });

    describe("SCANNING_COMPLETE mode", () => {
      describe("ap list empty", () => {
        beforeEach(() => { 
          obj().setState({ connection: SCANNING_COMPLETE, aps: [] }); 
        });

        it("disabled the SSID dropdown", () => {
          expect(renderEl().querySelector("select.select-ap").disabled).to.eq(true);
        });

        it("the SSID dropdown says 'No Access Points Found", () => {
          expect(renderEl().querySelector("select.select-ap > option").textContent).to.eq("No Access Points Found");
        });
      });

      describe("ap list not empty", () => {
        beforeEach(() => { 
          obj().setState({ connection: SCANNING_COMPLETE, aps: [ {"ssid":"MYAP","rssi":-90,"encryption":"8"} ] }); 
        });

        it("enables the SSID dropdown", () => {
          expect(renderEl().querySelector("select.select-ap").disabled).to.eq(false);
        });

        it("the SSID dropdown should list the APS", () => {
          expect(renderEl().querySelector("select.select-ap > option").textContent).to.eq("MYAP");
        });
      });
    });
  });

  describe('manual', () => {
    beforeEach(() => { scan = false });
  });
});