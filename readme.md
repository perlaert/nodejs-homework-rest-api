## Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими исправлениями простых ошибок

## Contacts

| Метод  | Путь                              | Описание                           |
| :----- | :-------------------------------- | :--------------------------------- |
| GET    | /api/contacts/                    | Получить все контакты пользователя |
| GET    | /api/contacts/:contactId          | Получить контакт                   |
| POST   | /api/contacts/                    | Создать контакт                    |
| DELETE | /api/contacts/:contactId          | Удалить контакт                    |
| PUT    | /api/contacts/:contactId          | Обновить контакт                   |
| PATCH  | /api/contacts/:contactId/favorite | Обновить поле favorite контакта    |

## Users

| Метод | Путь                            | Описание                                    |
| :---- | :------------------------------ | :------------------------------------------ |
| POST  | /api/users/signup               | Создать нового пользователя                 |
| POST  | /api/users/login                | Залогинить пользователя                     |
| POST  | /api/users/logout               | Разлогинить пользователя                    |
| GET   | /api/users/current              | Получить информацию о текущем пользователе  |
| PATCH | /api/users/avatars              | Обновить аватарку пользователя              |
| GET   | /api//verify/:verificationToken | Верификация пользователя по email           |
| POST  | /api/users/verify               | Повторная верификация пользователя по email |
