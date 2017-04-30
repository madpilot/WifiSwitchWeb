// Order is very important here
export const DEFAULTS = {
  encryption: '7',
  dhcp: true,
  syslog: false,
  mqttAuthMode: "0",
  mqttTLS: false,
  mqttPort: '',
  syslogPort: '',
  syslogLevel: '6',
  
  ssid: '',
  passkey: '',
  deviceName: '',
  mqttServerName: '',
  mqttUsername: '',
  mqttPassword: '',
  mqttFingerprint: '',
  mqttPublishChannel: '',
  mqttSubscribeChannel: '',
  syslogHost: '',
  staticIP: '',
  staticDNS: '',
  staticGateway: '',
  staticSubnet: '',
}
const STRINGS = Object.keys(DEFAULTS).slice(8);

function deserializeString(buffer, offset) {
  let len = buffer[offset];
  let start = offset + 1;
  let end = start + len;


  let string = buffer.slice(start, end).map((hex) => { return String.fromCharCode(hex) }).join('');
  return [ end, string ];
}

function serializeString(buffer, str) {
  if(typeof(str) != "string") {
    str = "";
  }
  let encoded = [ str.length ].concat(str.split('').map((chr) => chr.charCodeAt(0)));
  return buffer.concat(encoded);
}

export function encode(obj) {
  let bytes = [ 0, 0, 0, 0, 0, 0, 0 ];

  bytes[1] = obj.encryption & 0x07;
  bytes[1] += obj.dhcp ? 8 : 0;
  bytes[1] += obj.syslog ? 16 : 0;
  bytes[1] = bytes[1] | ((obj.mqttAuthMode & 0x03) << 5);
  bytes[1] += obj.mqttTLS ? 128 : 0;


  //// mqttPort - 16 bit number
  bytes[2] = (obj.mqttPort >> 8) & 0xFF;
  bytes[3] = obj.mqttPort & 0xFF;

  //// syslogPort - 16 bit number
  bytes[4] = (obj.syslogPort >> 8) & 0xff;
  bytes[5] = obj.syslogPort & 0xFF;

  //// syslogLevel - 8 bit number
  bytes[6] = obj.syslogLevel & 0xFF;

  // Generator that serializes all the strings
  STRINGS.forEach((key) => {
    bytes = serializeString(bytes, obj[key]);
  });

  let hex = '';
  bytes.forEach((byte) => {
    let h = byte.toString(16);
    if(h.length == 1) {
      h = "0" + h;
    }
    hex += h;
  });

  return hex;
}

export function decode(str) {
  let bytes = [];
  for(let i = 0; i < str.length / 2; i++) {
    bytes.push(parseInt(str.substring(i * 2, (i * 2) + 2), 16));
  }

  let obj = Object.assign({}, DEFAULTS, {
    encryption: bytes[1] & 0x07,
    dhcp: ((bytes[1] >> 3) & 0x01) == 1,
    syslog: ((bytes[1] >> 4) & 0x01) == 1,
    mqttAuthMode: (bytes[1] >> 5) & 0x03,
    mqttTLS: ((bytes[1] >> 7) & 0x01) == 1,
    mqttPort: (bytes[2] << 8) + bytes[3],
    syslogPort: (bytes[4] << 8) + bytes[5],
    syslogLevel: bytes[6]
  });

  let offset = 7;

  // Generator that deserializes all the strings
  STRINGS.forEach((key) => {
    [ offset, obj[key] ] = deserializeString(bytes, offset);
  });

  return obj;
}
