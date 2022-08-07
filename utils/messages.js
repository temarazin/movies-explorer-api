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
    login: 'Вы успешно авторизовались',
    logout: 'Вы успешно вышли из системы',
  },
  validation: {
    common: {
      // TODO: перенести makeErrorMsg в хелпер
      makeErrorMsg: (field, err) => `Поле [${field}] ${err}`,
      require: 'является обязательным',
      invalidFormat: 'не соотвествует формату',
      isNotEmpty: 'не должно быть пустым',
      isNotString: 'не является строкой',
      isNotNumber: 'не является числом',
      isNotInteger: 'не является целым числом',
      isNotEmail: 'не является E-mail\'ом',
      isNotUrl: 'не является валидным url-адресом',
      isNotHex: 'не является hex-строкой',
    },
    user: {
      invalidNameLength: `Имя должно содержать от ${validation.user.nameMinLength} до ${validation.user.nameMaxLength} символов`,
      requireName: 'Необходимо указать имя',
      invalidEmail: 'Некорректный E-mail',
      requireEmail: 'Необходимо указать E-mail',
      requirePassword: 'Необходимо указать пароль',
    },
    movie: {
      invalidOwner: 'Указан некорректный id пользователя',
      invalidMovieId: 'Указан некорректный id фильма',
    },
  },
};
