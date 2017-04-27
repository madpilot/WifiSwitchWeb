import { decode, encode } from './index.js';

describe("config", () => {
  let ssid,
      passkey,
      deviceName,
      encryption,
      dhcp,
      staticIP,
      staticDNS,
      staticGateway,
      staticSubnet,
      mqttAuthMode,
      mqttTLS,
      mqttServerName,
      mqttPort,
      mqttUsername,
      mqttPassword,
      mqttFingerprint,
      mqttPublishChannel,
      mqttSubscribeChannel,
      syslog,
      syslogHost,
      syslogPort,
      syslogLevel;

  beforeEach(() => {
    ssid = null,
    passkey = null,
    deviceName = null,
    encryption = 0,
    dhcp = false,
    staticIP = null,
    staticDNS = null,
    staticGateway = null,
    staticSubnet = null,
    mqttAuthMode = 0,
    mqttTLS = false,
    mqttServerName = null,
    mqttPort = 0,
    mqttUsername = null,
    mqttPassword = null,
    mqttFingerprint = null,
    mqttPublishChannel = null,
    mqttSubscribeChannel = null,
    syslog = false,
    syslogHost = null,
    syslogPort = 0,
    syslogLevel = 0
  });

  let toObj = function() {
    return {
      ssid,
      passkey,
      deviceName,
      encryption,
      dhcp,
      staticIP,
      staticDNS,
      staticGateway,
      staticSubnet,
      mqttAuthMode,
      mqttTLS,
      mqttServerName,
      mqttPort,
      mqttUsername,
      mqttPassword,
      mqttFingerprint,
      mqttPublishChannel,
      mqttSubscribeChannel,
      syslog,
      syslogHost,
      syslogPort,
      syslogLevel
    }
  }

  let valueAt = function(index) {
    let encoded = encode(toObj());
    return parseInt(encoded.substring(index, index + 2), 16);
  }

  let charAt = function(index) {
    return String.fromCharCode(valueAt(index));
  }

  describe("encode", () => {
    describe("ssid", () => {
      describe("is set", () => {
        beforeEach(() => { ssid = "Test" });

        it("encodes the length", () => {
          expect(valueAt(14)).to.eq(4);
        });

        it("encodes the string", () => {
          expect(charAt(16)).to.eq("T");
          expect(charAt(18)).to.eq("e");
          expect(charAt(20)).to.eq("s");
          expect(charAt(22)).to.eq("t");
        });
      });
    });

    describe("passkey", () => {
      describe("is set", () => {
        beforeEach(() => { passkey = "Test" });

        it("encodes the length", () => {
          expect(valueAt(16)).to.eq(4);
        });

        it("encodes the string", () => {
          expect(charAt(18)).to.eq("T");
          expect(charAt(20)).to.eq("e");
          expect(charAt(22)).to.eq("s");
          expect(charAt(24)).to.eq("t");
        });
      });
    });

    describe("encryption", () => {
      describe("byte 1", () => {
        [ 0, 1, 2, 3, 4 ].forEach((v) => {
          describe(v.toString(), () => {
            beforeEach(() => { encryption = v });
            it("is " + v, () => {
              expect(valueAt(2)).to.eq(v);
            });
          });
        });
      });
    });

    describe("deviceName", () => {
      describe("is set", () => {
        beforeEach(() => { deviceName = "Test" });

        it("encodes the length", () => {
          expect(valueAt(18)).to.eq(4);
        });

        it("encodes the string", () => {
          expect(charAt(20)).to.eq("T");
          expect(charAt(22)).to.eq("e");
          expect(charAt(24)).to.eq("s");
          expect(charAt(26)).to.eq("t");
        });
      });
    });

    describe("dhcp", () => {
      describe("true", () => {
        beforeEach(() => { dhcp = true });
        it("is 1", () => {
          expect(valueAt(2)).to.eq(8)
        });
      });

      describe("false", () => {
        beforeEach(() => { dhcp = false });
        it("is 0", () => {
          expect(valueAt(2)).to.eq(0)
        });
      });
    });

    describe("mqttServerName", () => {
      describe("is set", () => {
        beforeEach(() => { mqttServerName = "Test" });

        it("encodes the length", () => {
          expect(valueAt(20)).to.eq(4);
        });

        it("encodes the string", () => {
          expect(charAt(22)).to.eq("T");
          expect(charAt(24)).to.eq("e");
          expect(charAt(26)).to.eq("s");
          expect(charAt(28)).to.eq("t");
        });
      });
    });

    describe("mqttUsername", () => {
      describe("is set", () => {
        beforeEach(() => { mqttUsername = "Test" });

        it("encodes the length", () => {
          expect(valueAt(22)).to.eq(4);
        });

        it("encodes the string", () => {
          expect(charAt(24)).to.eq("T");
          expect(charAt(26)).to.eq("e");
          expect(charAt(28)).to.eq("s");
          expect(charAt(30)).to.eq("t");
        });
      });
    });

    describe("mqttPassword", () => {
      describe("is set", () => {
        beforeEach(() => { mqttPassword = "Test" });

        it("encodes the length", () => {
          expect(valueAt(24)).to.eq(4);
        });

        it("encodes the string", () => {
          expect(charAt(26)).to.eq("T");
          expect(charAt(28)).to.eq("e");
          expect(charAt(30)).to.eq("s");
          expect(charAt(32)).to.eq("t");
        });
      });
    });

    describe("mqttFingerprint", () => {
      describe("is set", () => {
        beforeEach(() => { mqttFingerprint = "ef 0f 0f 7f f2 ff 42 82 bf 52 23 50 5f f4 9e 33 ef 0f 0f 7f" });

        it("encodes the length", () => {
          expect(valueAt(26)).to.eq(59);
        });

        it("encodes the string", () => {
          expect(charAt(28)).to.eq("e");
          expect(charAt(30)).to.eq("f");
          expect(charAt(142)).to.eq("7");
          expect(charAt(144)).to.eq("f");
        });
      });
    });

    describe("mqttPublishChannel", () => {
      describe("is set", () => {
        beforeEach(() => { mqttPublishChannel = "Test" });

        it("encodes the length", () => {
          expect(valueAt(28)).to.eq(4);
        });

        it("encodes the string", () => {
          expect(charAt(30)).to.eq("T");
          expect(charAt(32)).to.eq("e");
          expect(charAt(34)).to.eq("s");
          expect(charAt(36)).to.eq("t");
        });
      });
    });

    describe("mqttSubscribeChannel", () => {
      describe("is set", () => {
        beforeEach(() => { mqttSubscribeChannel = "Test" });

        it("encodes the length", () => {
          expect(valueAt(30)).to.eq(4);
        });

        it("encodes the string", () => {
          expect(charAt(32)).to.eq("T");
          expect(charAt(34)).to.eq("e");
          expect(charAt(36)).to.eq("s");
          expect(charAt(38)).to.eq("t");
        });
      });
    });

    describe("mqttAuthMode", () => {
      describe("byte 1", () => {
        [ 0, 1, 2 ].forEach((v) => {
          describe(v.toString(), () => {
            beforeEach(() => { mqttAuthMode = v });
            it("is " + v, () => {
              expect(valueAt(2)).to.eq(v << 5);
            });
          });
        });
      });
    });

    describe("mqttTLS", () => {
      describe("true", () => {
        beforeEach(() => { mqttTLS = true });
        it("is 1", () => {
          expect(valueAt(2)).to.eq(128)
        });
      });

      describe("false", () => {
        beforeEach(() => { mqttTLS = false });
        it("is 0", () => {
          expect(valueAt(2)).to.eq(0)
        });
      });
    });

    describe("mqttPort", () => {
      describe("0", () => {
        beforeEach(() => { mqttPort = 0 });
        it("is 0", () => {
          expect(valueAt(4) << 8 + valueAt(6)).to.eq(0)
        });
      });

      describe("1883", () => {
        beforeEach(() => { mqttPort = 1883 });
        it("is 1883", () => {
          expect((valueAt(4) << 8) + valueAt(6)).to.eq(1883)
        });
      });

      describe("8883", () => {
        beforeEach(() => { mqttPort = 8883 });
        it("is 8883", () => {
          expect((valueAt(4) << 8) + valueAt(6)).to.eq(8883)
        });
      });

      describe("32768", () => {
        beforeEach(() => { mqttPort = 32768 });
        it("is 32768", () => {
          expect(valueAt(4) << 8 + valueAt(6)).to.eq(32768)
        });
      });
    });

    describe("syslog", () => {
      describe("true", () => {
        beforeEach(() => { syslog = true });
        it("is 1", () => {
          expect(valueAt(2)).to.eq(16)
        });
      });

      describe("false", () => {
        beforeEach(() => { syslog = false });
        it("is 0", () => {
          expect(valueAt(2)).to.eq(0)
        });
      });
    });

    describe("syslogHost", () => {
      describe("is set", () => {
        beforeEach(() => { syslogHost = "Test" });

        it("encodes the length", () => {
          expect(valueAt(32)).to.eq(4);
        });

        it("encodes the string", () => {
          expect(charAt(34)).to.eq("T");
          expect(charAt(36)).to.eq("e");
          expect(charAt(38)).to.eq("s");
          expect(charAt(40)).to.eq("t");
        });
      });
    });

    describe("syslogPort", () => {
      describe("0", () => {
        beforeEach(() => { syslogPort = 0 });
        it("is 0", () => {
          expect(valueAt(8) << 8 + valueAt(10)).to.eq(0)
        });
      });

      describe("514", () => {
        beforeEach(() => { syslogPort = 514 });
        it("is 514", () => {
          expect((valueAt(8) << 8) + valueAt(10)).to.eq(514)
        });
      });

      describe("32768", () => {
        beforeEach(() => { syslogPort = 32768 });
        it("is 32768", () => {
          expect(valueAt(8) << 8 + valueAt(10)).to.eq(32768)
        });
      });
    });

    describe("syslogLevel", () => {
      [ 0, 1, 2, 3, 4, 5, 6, 7 ].forEach((level) => {
        describe(level.toString(), () => {
          beforeEach(() => { syslogLevel = level });
          it("is " + level, () => {
            expect(valueAt(12)).to.eq(level)
          });
        });
      });
    });

    describe("staticIP", () => {
      describe("is set", () => {
        beforeEach(() => { staticIP = "Test" });

        it("encodes the length", () => {
          expect(valueAt(34)).to.eq(4);
        });

        it("encodes the string", () => {
          expect(charAt(36)).to.eq("T");
          expect(charAt(38)).to.eq("e");
          expect(charAt(40)).to.eq("s");
          expect(charAt(42)).to.eq("t");
        });
      });
    });

    describe("staticDNS", () => {
      describe("is set", () => {
        beforeEach(() => { staticDNS = "Test" });

        it("encodes the length", () => {
          expect(valueAt(36)).to.eq(4);
        });

        it("encodes the string", () => {
          expect(charAt(38)).to.eq("T");
          expect(charAt(40)).to.eq("e");
          expect(charAt(42)).to.eq("s");
          expect(charAt(44)).to.eq("t");
        });
      });
    });

    describe("staticGateway", () => {
      describe("is set", () => {
        beforeEach(() => { staticGateway = "Test" });

        it("encodes the length", () => {
          expect(valueAt(38)).to.eq(4);
        });

        it("encodes the string", () => {
          expect(charAt(40)).to.eq("T");
          expect(charAt(42)).to.eq("e");
          expect(charAt(44)).to.eq("s");
          expect(charAt(46)).to.eq("t");
        });
      });
    });

    describe("staticSubnet", () => {
      describe("is set", () => {
        beforeEach(() => { staticSubnet = "Test" });

        it("encodes the length", () => {
          expect(valueAt(40)).to.eq(4);
        });

        it("encodes the string", () => {
          expect(charAt(42)).to.eq("T");
          expect(charAt(44)).to.eq("e");
          expect(charAt(46)).to.eq("s");
          expect(charAt(48)).to.eq("t");
        });
      });
    });
  });

  describe("encode", () => {
    let data = "00dc22b302020708596f7572574946490b596f7572506173736b6579066761726167650a6d7174742e6c6f63616c096d7174745f757365720d6d7174745f70617373776f72643b656620306620306620376620663220666620343220383220626620353220323320353020356620663420396520333320656620306620306620376614686f6d652d617373697374616e742f636f76657218686f6d652d617373697374616e742f636f7665722f7365740b3139322e3136382e302e320c3139322e3136382e302e313007382e382e382e340b3139322e3136382e302e310d3235352e3235352e3235352e30"
    let decoded = null;
    beforeEach(() => { decoded = decode(data) });

    describe("encryption", () => {
      it("is decoded", () => {
        expect(decoded.encryption).to.eq(4);
      });
    });

    describe("dhcp", () => {
      it("is decoded", () => {
        expect(decoded.dhcp).to.eq(true);
      });
    });

    describe("syslog", () => {
      it("is decoded", () => {
        expect(decoded.syslog).to.eq(true);
      });
    });

    describe("mqttAuthMode", () => {
      it("is decoded", () => {
        expect(decoded.mqttAuthMode).to.eq(2);
      });
    });

    describe("mqttTLS", () => {
      it("is decoded", () => {
        expect(decoded.mqttTLS).to.eq(true);
      });
    });

    describe("mqttPort", () => {
      it("is decoded", () => {
        expect(decoded.mqttPort).to.eq(8883);
      });
    });

    describe("syslogPort", () => {
      it("is decoded", () => {
        expect(decoded.syslogPort).to.eq(514);
      });
    });

    describe("syslogLevel", () => {
      it("is decoded", () => {
        expect(decoded.syslogLevel).to.eq(7);
      });
    });

    describe("ssid", () => {
      it("is decoded", () => {
        expect(decoded.ssid).to.eq("YourWIFI");
      });
    });

    describe("passkey", () => {
      it("is decoded", () => {
        expect(decoded.passkey).to.eq("YourPasskey");
      });
    });

    describe("deviceName", () => {
      it("is decoded", () => {
        expect(decoded.deviceName).to.eq("garage");
      });
    });

    describe("mqttServerName", () => {
      it("is decoded", () => {
        expect(decoded.mqttServerName).to.eq("mqtt.local");
      });
    });

    describe("mqttUsername", () => {
      it("is decoded", () => {
        expect(decoded.mqttUsername).to.eq("mqtt_user");
      });
    });

    describe("mqttPassword", () => {
      it("is decoded", () => {
        expect(decoded.mqttPassword).to.eq("mqtt_password");
      });
    });

    describe("mqttFingerprint", () => {
      it("is decoded", () => {
        expect(decoded.mqttFingerprint).to.eq("ef 0f 0f 7f f2 ff 42 82 bf 52 23 50 5f f4 9e 33 ef 0f 0f 7f");
      });
    });

    describe("mqttPublishChannel", () => {
      it("is decoded", () => {
        expect(decoded.mqttPublishChannel).to.eq("home-assistant/cover");
      });
    });

    describe("mqttSubscribeChannel", () => {
      it("is decoded", () => {
        expect(decoded.mqttSubscribeChannel).to.eq("home-assistant/cover/set");
      });
    });

    describe("syslogHost", () => {
      it("is decoded", () => {
        expect(decoded.syslogHost).to.eq("192.168.0.2");
      });
    });

    describe("staticIP", () => {
      it("is decoded", () => {
        expect(decoded.staticIP).to.eq("192.168.0.10");
      });
    });

    describe("staticDNS", () => {
      it("is decoded", () => {
        expect(decoded.staticDNS).to.eq("8.8.8.4");
      });
    });

    describe("staticGateway", () => {
      it("is decoded", () => {
        expect(decoded.staticGateway).to.eq("192.168.0.1");
      });
    });

    describe("staticSubnet", () => {
      it("is decoded", () => {
        expect(decoded.staticSubnet).to.eq("255.255.255.0");
      });
    });
  });
});
