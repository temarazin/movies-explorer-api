module.exports = {
  commonSettings: {
    developSecretKey: 'some-key',
    defaultPort: 3000,
  },
  dbConnect: {
    dbName: 'moviesdb',
    dbHost: 'mongodb://localhost:27017/',
  },
  validation: {
    user: {
      nameMinLength: 2,
      nameMaxLength: 30,
    },
  },
};
