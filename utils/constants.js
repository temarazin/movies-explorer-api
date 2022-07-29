module.exports.SETTINGS = {
  validation: {
    user: {
      nameMinLength: 2,
      nameMaxLength: 30,
    },
  },
};

const $ = this.SETTINGS;

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

module.exports.MSG = {
  error: {
    badRequest: {
      default: 'Некорректные данные в запросе',
    },
    unauthorized: {
      default: 'Необходима авторизация',
    },
    forbidden: {
      default: 'Недостаточно прав',
    },
    notFound: {
      default: 'Ресурс не найден',
      movie: 'Фильм не найден',
      user: 'Пользователь не найден',
    },
    conflict: {
      default: 'Запрос не может быть исполнен',
      emailAlreadyExist: 'Пользователь с таким E-mail уже существует',
    },
    serverError: {
      default: 'Что-то пошло не так',
    },
  },
  success: {
    default: 'Запрос выполнен',
    movieWasRemoved: 'Фильм удален',
  },
  validation: {
    user: {
      invalidNameLength: `Имя должно содержать от ${$.validation.user.nameMinLength} до ${$.validation.user.nameMaxLength} символов`,
      invalidEmail: 'Некорректный E-mail',
    },
  },
};
