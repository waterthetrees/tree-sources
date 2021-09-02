const configTreeDB = {
  connectionLimit: 10, // what does this mean?
  host: process.env.DATABASE_HOST || 'postgis-wtt',
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT || 5432,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  dateStrings: 'date',
  connect_timeout: 10,
};

const configPgNative = `
  host=${configTreeDB.host}
  dbname=${configTreeDB.database}
  user=${configTreeDB.user}
  password=${configTreeDB.password}
  port=${configTreeDB.port}
  connect_timeout=${configTreeDB.connect_timeout}
`;

module.exports = { configTreeDB, configPgNative };
