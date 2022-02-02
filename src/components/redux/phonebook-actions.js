import { createAction } from '@reduxjs/toolkit';
//                                                      prepareCallback -> (Подготовка формы payload)
// export const addContact = createAction(AddContact, (name, id, number) => ({
//   payload: {
//     name,
//     id,
//     number,
//   },
// }));
// сложный вариант реализации addContact

export const addContact = createAction('phonebook/addContact');
// console.log(addContact({ a: 5 }));
//Кидаем объект внутрь addContact вместо отдельных параметров

export const deleteContact = createAction('phonebook/deleteContact');

export const searchContacts = createAction('phonebook/searchContacts');
