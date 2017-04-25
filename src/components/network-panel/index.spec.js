import NetworkPanel from './index.js';
import { Component } from 'preact';

describe("<NetworkPanel>", () => {
  let dhcp, ipAddress, dnsServer, gateway, subnet, onUpdate;

  beforeEach(() =>{
    dhcp = undefined;
    ipAddress = undefined;
    dnsServer = undefined;
    gateway = undefined;
    subnet = undefined;
    onUpdate = undefined;
  });

  let _obj = null;
  let obj = (() => {
    if(_obj == null) {
      _obj = new NetworkPanel({
        dhcp: dhcp,
        ipAddress: ipAddress,
        dnsServer: dnsServer,
        gateway: gateway,
        subnet: subnet,
        onUpdate: onUpdate
      });
    }
    return _obj;
  });

  beforeEach(() => { _obj = null });

  let renderEl = (() => {
    return renderHTML(
      <NetworkPanel
        dhcp={dhcp}
        ipAddress={ipAddress}
        dnsServer={dnsServer}
        gateway={gateway}
        subnet={subnet}
        onUpdate={onUpdate}
        />
    );
  });

  describe("update", () => {
    let spy;
    let state = { state: 'state' };
    beforeEach(() => { spy = sinon.spy(); onUpdate = spy });

    it("calls onUpdate", () => {
      obj().update(state);
      expect(spy).to.have.been.calledWith({
        dhcp: dhcp,
        ipAddress: ipAddress,
        dnsServer: dnsServer,
        gateway: gateway,
        subnet: subnet,
        onUpdate: onUpdate,
        state: 'state'
      });
    });
  });

  describe("onDCHPChange", () => {
    let stub;
    beforeEach(() => { stub = sinon.stub(obj(), 'update') });

    describe("dhcp select value is 1", () => {
      it("updates dhcp to true", () => {
        obj().onDHCPChange({ target: { value: '1' } });
        expect(stub).to.have.been.calledWith({ dhcp: true });
      });
    });

    describe("dhcp select value is 0", () => {
      it("updates dhcp to false", () => {
        obj().onDHCPChange({ target: { value: '0' } });
        expect(stub).to.have.been.calledWith({ dhcp: false });
      });
    });
  });

  describe("#render", () => {
    describe("section", () => {
      it("className is panel", () => {
        expect(renderEl().querySelector("section").className).to.eq("panel");   
      });
    });

    describe("h3", () => {
      it("className is heading", () => {
        expect(renderEl().querySelector("section > h3.heading")).to.not.eq(null);
      });

      it("has Network Settings as the title", () => {
        expect(renderEl().querySelector("section > h3.heading").textContent).to.eq("Network Settings");
      });
    });

    describe("group", () => {
      it("className is group", () => {
        expect(renderEl().querySelector("section > div.group")).to.not.eq(null);
      });
    });
  });
});
 
