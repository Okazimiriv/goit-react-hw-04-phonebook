// import { useState } from 'react';
import useLocalStorage from 'hooks/useLocaStorage';
import { Formik } from 'formik';
import * as yup from 'yup';

import shortId from 'shortid';
import PropTypes from 'prop-types';
// import IconButton from 'components/IconButton/IconButton';

import {
  Form,
  FormLabel,
  FormField,
  ErrorMessage,
  StyledButton,
} from './ContactForm.styled';

const initialValues = {
  name: '',
  number: '',
};

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d`Artagnan'
    )
    .required(),
  number: yup
    .string()
    .trim()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

const nameInputId = shortId.generate();
const numberInputId = shortId.generate();

function ContactForm({ onAddContact }) {
  const [name, setName] = useLocalStorage('name', '');
  const [number, setNumber] = useLocalStorage('number', '');

  const handleChange = event => {
    console.log(event.target.name);
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = values => {
    console.log('values', values);
    onAddContact(values);

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form autoComplete="off">
        <FormLabel>Name</FormLabel>
        <FormField
          type="text"
          name="name"
          value={name}
          id={nameInputId}
          onChange={handleChange}
          placeholder="Harry Potter"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <ErrorMessage name="name" component="span" />
        <FormLabel>Number</FormLabel>
        <FormField
          type="tel"
          name="number"
          value={number}
          id={numberInputId}
          onChange={handleChange}
          placeholder="765-43-21"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <ErrorMessage name="number" component="span" />
        <StyledButton type="submit">Add contact</StyledButton>
      </Form>
    </Formik>
  );
}

PropTypes.ContactForm = {
  onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
