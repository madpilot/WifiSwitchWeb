import MQTTPanel from './index.js';
import { AUTH_MODE_NONE, AUTH_MODE_USERNAME, AUTH_MODE_CERTIFICATE } from './index.js';

describe("<MQTTPanel>", () => {
  describe("#render", () => {
    let mqttAuthMode, mqttServerName, mqttPort, mqttTLS, mqttUsername, mqttPassword, mqttFingerprint, mqttPublishChannel, mqttSubscribeChannel, onUpdate;

    let renderEl = (() => {
      return renderHTML(<MQTTPanel mqttAuthMode={mqttAuthMode} mqttServerName={mqttServerName} mqttPort={mqttPort} mqttTLS={mqttTLS} mqttUsername={mqttUsername} mqttPassword={mqttPassword} mqttFingerprint={mqttFingerprint} mqttPublishChannel={mqttPublishChannel} mqttSubscribeChannel={mqttSubscribeChannel} onUpdate={onUpdate} />);
    });

    beforeEach(() => {
      mqttAuthMode = AUTH_MODE_NONE;
      mqttServerName = undefined;
      mqttPort = undefined;
      mqttTLS = false;
      mqttUsername = undefined;
      mqttPassword = undefined;
      mqttFingerprint = undefined;
      mqttPublishChannel = undefined;
      mqttSubscribeChannel = undefined;

      onUpdate = sinon.stub();
    });

    describe("#render", () => {
      describe("mqttServerName", () => {
        beforeEach(() => { mqttServerName = "mqtt.local" });
        it("renders", () => {
          expect(renderEl().querySelector("input[name='mqttServerName']")).to.not.eq(null);
        });

        it("value is set", () => {
          expect(renderEl().querySelector("input[name='mqttServerName']").value).to.eq(mqttServerName);
        });

        it("onInput triggers update", () => {
          let evt = document.createEvent("HTMLEvents");
          evt.initEvent("input", false, true);

          let input = renderEl().querySelector("input[name='mqttServerName']");
          input.value = "mqtt.com";
          input.dispatchEvent(evt);
          expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttServerName: "mqtt.com" }))
        });
      });

      describe("mqttPort", () => {
        describe("Empty", () => {
          beforeEach(() => { mqttPort = "" });

          describe("TLS is true", () => {
            beforeEach(() => { mqttTLS = true });

            it("sets the placeholder to 8883", () => {
              expect(renderEl().querySelector("input[name='mqttPort']").getAttribute('placeholder')).to.eq('8883');
            });
          });

          describe("TLS is false", () => {
            beforeEach(() => { mqttTLS = false });

            it("sets the placeholder to 1883", () => {
              expect(renderEl().querySelector("input[name='mqttPort']").getAttribute('placeholder')).to.eq('1883');
            });
          });
        });

        describe("Set", () => {
          beforeEach(() => { mqttPort = "1883" });
          it("renders", () => {
            expect(renderEl().querySelector("input[name='mqttPort']")).to.not.eq(null);
          });

          it("value is set", () => {
            expect(renderEl().querySelector("input[name='mqttPort']").value).to.eq(mqttPort);
          });

          it("onInput triggers update", () => {
            let evt = document.createEvent("HTMLEvents");
            evt.initEvent("input", false, true);

            let input = renderEl().querySelector("input[name='mqttPort']");
            input.value = "8883";
            input.dispatchEvent(evt);
            expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttPort: "8883" }))
          });
        });
      });

      describe("mqttTLS", () => {
        it("renders", () => {
          expect(renderEl().querySelector("input[name='mqttTLS']")).to.not.eq(null);
        });
        
        describe("true", () => {
          beforeEach(() => { mqttTLS = false });

          it("value is set", () => {
            expect(renderEl().querySelector("input[name='mqttTLS']").checked).to.eq(mqttTLS);
          });
        });

        describe("onChange", () => {
          let checked;

          let trigger = (() => {
            let evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);

            let input = renderEl().querySelector("input[name='mqttTLS']");
            input.checked = checked;
            input.dispatchEvent(evt);
          });
          
          describe("empty port", () => {
            beforeEach(() => { mqttPort = "" });

            describe("becomes checked", () => {
              beforeEach(() => { mqttTLS = false; checked = true });

              it("set mqttTLS to true", () => {
                trigger();
                expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttTLS: true }))
              });
              
              describe("port", () => {
                it("is set to 8883", () => {
                  trigger();
                  expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttPort: "8883" }))
                });

                it("is empty", () => {
                  trigger();
                  expect(renderEl().querySelector("input[name='mqttPort']").value).to.eq("");
                });

                it("shows the placeholder", (done) => {
                  trigger();
                  setTimeout(function() {
                    expect(renderEl().querySelector("input[name='mqttPort']").getAttribute("placeholder")).to.eq("8883");
                    done();
                  }, 0);
                });
              });

            });

            describe("becomes unchecked", () => {
              beforeEach(() => { mqttTLS = true; checked = false });

              it("set mqttTLS to false", () => {
                trigger();
                expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttTLS: false }))
              });

              describe("port", () => {
                it("is set to 1883", () => {
                  trigger();
                  expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttPort: "1883" }))
                });

                it("is empty", () => {
                  trigger();
                  expect(renderEl().querySelector("input[name='mqttPort']").value).to.eq("");
                });

                it("shows the placeholder", (done) => {
                  trigger();
                  setTimeout(function() {
                    expect(renderEl().querySelector("input[name='mqttPort']").getAttribute("placeholder")).to.eq("1883");
                    done();
                  }, 0);
                });
              });
            });
          });
        });
      });
      
      describe("mqttPublishChannel", () => {
        beforeEach(() => { mqttPublishChannel = "mqtt/publish" });
        
        it("renders", () => {
          expect(renderEl().querySelector("input[name='mqttPublishChannel']")).to.not.eq(null);
        });

        it("value is set", () => {
          expect(renderEl().querySelector("input[name='mqttPublishChannel']").value).to.eq(mqttPublishChannel);
        });

        it("onInput triggers update", () => {
          let evt = document.createEvent("HTMLEvents");
          evt.initEvent("input", false, true);

          let input = renderEl().querySelector("input[name='mqttPublishChannel']");
          input.value = "mqtt/publishChannel";
          input.dispatchEvent(evt);
          expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttPublishChannel: "mqtt/publishChannel" }))
        });
      });

      describe("mqttSubscribeChannel", () => {
        beforeEach(() => { mqttSubscribeChannel = "mqtt/subscribe" });
        it("renders", () => {
          expect(renderEl().querySelector("input[name='mqttSubscribeChannel']")).to.not.eq(null);
        });

        it("value is set", () => {
          expect(renderEl().querySelector("input[name='mqttSubscribeChannel']").value).to.eq(mqttSubscribeChannel);
        });

        it("onInput triggers update", () => {
          let evt = document.createEvent("HTMLEvents");
          evt.initEvent("input", false, true);

          let input = renderEl().querySelector("input[name='mqttSubscribeChannel']");
          input.value = "mqtt/subscribeChannel";
          input.dispatchEvent(evt);
          expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttSubscribeChannel: "mqtt/subscribeChannel" }))
        });
      });

    });
  });
});
