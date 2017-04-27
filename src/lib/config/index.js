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

  bytes = serializeString(bytes, obj.ssid);
  bytes = serializeString(bytes, obj.passkey);
  bytes = serializeString(bytes, obj.deviceName);
  bytes = serializeString(bytes, obj.mqttServerName);
  bytes = serializeString(bytes, obj.mqttUsername);
  bytes = serializeString(bytes, obj.mqttPassword);
  bytes = serializeString(bytes, obj.mqttFingerprint);
  bytes = serializeString(bytes, obj.mqttPublishChannel);
  bytes = serializeString(bytes, obj.mqttSubscribeChannel);
  bytes = serializeString(bytes, obj.syslogHost);
  bytes = serializeString(bytes, obj.staticIP);
  bytes = serializeString(bytes, obj.staticDNS);
  bytes = serializeString(bytes, obj.staticGateway);
  bytes = serializeString(bytes, obj.staticSubnet);

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

  let encryption = bytes[1] & 0x07;
  let dhcp = ((bytes[1] >> 3) & 0x01) == 1;
  let syslog = ((bytes[1] >> 4) & 0x01) == 1;
  let mqttAuthMode = (bytes[1] >> 5) & 0x03;
  let mqttTLS = ((bytes[1] >> 7) & 0x01) == 1;
  let mqttPort = (bytes[2] << 8) + bytes[3];
  let syslogPort = (bytes[4] << 8) + bytes[5];
  let syslogLevel = bytes[6];

  let offset = 7;
  let ssid,
      passkey,
      deviceName,
      mqttServerName,
      mqttUsername,
      mqttPassword,
      mqttFingerprint,
      mqttPublishChannel,
      mqttSubscribeChannel,
      syslogHost,
      staticIP,
      staticDNS,
      staticGateway,
      staticSubnet;

  [ offset, ssid ] = deserializeString(bytes, offset);
  [ offset, passkey ] = deserializeString(bytes, offset);
  [ offset, deviceName ] = deserializeString(bytes, offset);
  [ offset, mqttServerName ] = deserializeString(bytes, offset);
  [ offset, mqttUsername ] = deserializeString(bytes, offset);
  [ offset, mqttPassword ] = deserializeString(bytes, offset);
  [ offset, mqttFingerprint ] = deserializeString(bytes, offset);
  [ offset, mqttPublishChannel ] = deserializeString(bytes, offset);
  [ offset, mqttSubscribeChannel ] = deserializeString(bytes, offset);
  [ offset, syslogHost ] = deserializeString(bytes, offset);
  [ offset, staticIP ] = deserializeString(bytes, offset);
  [ offset, staticDNS ] = deserializeString(bytes, offset);
  [ offset, staticGateway ] = deserializeString(bytes, offset);
  [ offset, staticSubnet ] = deserializeString(bytes, offset);


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
  };
}
