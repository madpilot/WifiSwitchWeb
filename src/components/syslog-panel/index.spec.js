import SyslogPanel from './index.js';

describe("<SyslogPanel>", () => {
  describe("#render", () => {
    let syslog, syslogHost, syslogPort, syslogLevel, onUpdate;

    beforeEach(() => {
      syslog = false;
      syslogHost = "";
      syslogPort = "";
      syslogLevel = "",
      onUpdate = sinon.stub();
    });

    let renderEl = (() => {
      return renderHTML(<SyslogPanel syslog={syslog} syslogHost={syslogHost} syslogPort={syslogPort} syslogLevel={syslogLevel} onUpdate={onUpdate} />);
    });

    describe("section", () => {
      it("has a className of panel", () => {
        expect(renderEl().querySelector("section").className).to.eq("panel");
      });
    });

    describe("h3", () => {
      it("has a className of heading", () => {
        expect(renderEl().querySelector("h3").className).to.eq("heading");
      });

      it("text is Syslog settings", () => {
        expect(renderEl().querySelector("h3").textContent).to.eq("Syslog settings");
      });
    });

    describe("BinaryInput", () => {
      describe("syslog is true", () => {
        beforeEach(() => { syslog = true });

        it("is checked", () => {
          expect(renderEl().querySelector("input[type='checkbox']").checked).to.eq(true);
        });
      })

      describe("syslog is false", () => {
        beforeEach(() => { syslog = false });

        it("is checked", () => {
          expect(renderEl().querySelector("input[type='checkbox']").checked).to.eq(false);
        });
      });

      describe("onChange", () => {
        [ "true", "false" ].forEach((bool) => {
          describe("checked is " + bool, () => {
            beforeEach(() => { 
              syslog = (bool == "true" ? false : true);
              
              let evt = document.createEvent("HTMLEvents");
              evt.initEvent("change", false, true);

              let el = renderEl();
              let input = el.querySelector("input[type='checkbox']");
              input.checked = !syslog;
              input.dispatchEvent(evt);
            });
         
            it("triggers the component onUpdate event", () => {
              expect(onUpdate).to.have.been.calledWith(sinon.match({ syslog: !syslog }))
            });
          });
        });
      });
    });

    describe('renderform', () => {
      describe('syslog is false', () => {
        beforeEach(() => { syslog = false });
        it("does not render", () => {
          expect(renderEl().querySelector("div.form")).to.eq(null);
        });
      });

      describe("syslog is true", () => {
        beforeEach(() => { syslog = true });
        it("does not render", () => {
          expect(renderEl().querySelector("div.form")).to.not.eq(null);
        });
      });
    });
  });
});

