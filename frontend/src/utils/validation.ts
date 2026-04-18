export const validateEmail = (email: string) => {

  // простая regex проверка email
  const regex = /^\S+@\S+\.\S+$/;

  // возвращаем true если валидный
  return regex.test(email);
};

// проверка пароля
export const validatePassword = (password: string) => {

  // минимум 6 символов
  return password.length >= 6;
};

// проверка имени
export const validateName = (name: string) => {

  // минимум 2 символа
  return name.trim().length >= 2;
};