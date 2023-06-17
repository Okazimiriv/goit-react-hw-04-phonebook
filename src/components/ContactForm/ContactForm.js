import React from 'react';
// import useLocalStorage from 'hooks/useLocaStorage';
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

const ContactForm = ({ onAddContact }) => {
  const nameInputId = shortId.generate();
  const numberInputId = shortId.generate();

  const handleSubmit = (values, { resetForm }) => {
    onAddContact(values);

    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form autoComplete="on">
        <FormLabel>Name</FormLabel>
        <FormField
          type="text"
          name="name"
          id={nameInputId}
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
          id={numberInputId}
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
};

PropTypes.ContactForm = {
  onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
