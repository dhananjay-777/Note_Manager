const { Client } = require("pg");

const client = new Client(
  `postgres://tnxmjgdx:pBRVpnXLZZZBwakMv2zGeQ0_LIZ3cLeP@satao.db.elephantsql.com/tnxmjgdx`
);

module.exports = client;
