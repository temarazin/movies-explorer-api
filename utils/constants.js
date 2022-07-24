module.exports.STATUS_CODE = {
  success: {
    ok: 200,
    created: 201,
  },
  error: {
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    conflict: 409,
    serverError: 500,
  },
};

module.exports.ERROR_CODE = {
  mongo: {
    duplicateKey: 11000,
  },
};
