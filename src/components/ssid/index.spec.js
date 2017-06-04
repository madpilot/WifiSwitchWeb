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
    onModeChange = sinon.stub();
    onChange = sinon.stub();
    _obj = null;
  });

  describe("#scan", () => {
    let json = [
      {"ssid":"OPTUSVD3C49EE8","rssi":-90,"encryption":"8"},
      {"ssid":"Dean&Carol.b","rssi":-92,"encryption":"7"},
      {"ssid":"NETGEAR19","rssi":-76,"encryption":"4"},
      {"ssid":"MyWifi","rssi":-60,"encryption":"4"},
      {"ssid":"OPTUS_B8EC72","rssi":-89,"encryption":"8"},
      {"ssid":"OPTUS_A49184","rssi":-85,"encryption":"8"}
    ];

    let changeApStub;

    beforeEach(() => {
      changeApStub = sinon.stub(obj(), 'changeAp');
    });

    afterEach(() =>{
      changeApStub.restore();
    });

    beforeEach(() => { scan = true });

    describe("on call", () => {
      beforeEach(() => obj().scan());
      it("sets connection mode to scanning", () => {
        expect(obj().state.connection).to.eq(SCANNING);
      });

      it("sets aps to []", () => {
        expect(obj().state.aps.length).to.eq(0);
      });
    });

    describe("on resolve", () => {
      let fetcher;

      beforeEach(() => {
        fetcher = sinon.stub(window, 'fetch').resolves({ ok: true, json: sinon.stub().resolves(json) });
      });

      afterEach(() =>{
        fetcher.restore();
      });

      it("sets connection mode to scanning complete", (done) => {
        obj().scan();
        setTimeout(() => {
          expect(obj().state.connection).to.eq(SCANNING_COMPLETE);
          done();
        });
      });

      it("sets the ap list", (done) => {
        obj().scan();
        setTimeout(() => {
          expect(obj().state.aps).to.eql(json);
          done();
        });
      });

      describe("ssid state set", () => {
        beforeEach(() => { ssid: 'MyWifi' });

        it("should select the previous selected ap", () => {
          obj().scan();
          setTimeout(() => {
            expect(changeApStub).to.have.been.calledWith('MyWifi');
            done();
          });
        });
      });

      describe("ssid state not set", () => {
        beforeEach(() => { ssid: 'nointhere' });

        it("should select the first ap", (done) => {
          obj().scan();
          setTimeout(() => {
            expect(changeApStub).to.have.been.calledWith(json[0].ssid)
            done();
          });
        });
      });
    });
  });

  describe("#render", () => {
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

      describe("error", () => {
        describe("valid true", () => {
          beforeEach(() => {
            obj().setState({ valid: true });
          });

          it("is not rendered", () => {
            expect(renderEl().querySelector("span.error")).to.eq(null);
          });
        });

        describe("valid false", () => {
          beforeEach(() => {
            obj().setState({ valid: false, error: "not set" });
          });

          it("is not rendered", () => {
            expect(renderEl().querySelector("span.error")).to.eq(null);
          });
        });
      });
    });

    describe('manual', () => {
      beforeEach(() => { scan = false });

      describe("error", () => {
        describe("valid true", () => {
          beforeEach(() => {
            obj().setState({ valid: true });
          });

          it("is not rendered", () => {
            expect(renderEl().querySelector("span.error")).to.eq(null);
          });
        });

        describe("valid false", () => {
          beforeEach(() => {
            obj().setState({ valid: false, error: "not set" });
          });

          it("is rendered", () => {
            expect(renderEl().querySelector("span.error")).to.not.eq(null);
          });

          it("renders the error", () => {
            expect(renderEl().querySelector("span.error").textContent).to.eq("not set");
          });
        });
      });
    });
  });
});
