const { validation } = require('./settings');

module.exports = {
  error: {
    badRequest: {
      default: 'Некорректные данные в запросе',
    },
    unauthorized: {
      default: 'Необходима авторизация',
      cantAuth: 'Неверные E-mail или пароль',
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
      invalidNameLength: `Имя должно содержать от ${validation.user.nameMinLength} до ${validation.user.nameMaxLength} символов`,
      invalidEmail: 'Некорректный E-mail',
    },
  },
};
