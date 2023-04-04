import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const PostForm = ({ initialValues, onSubmit }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    type: Yup.string().oneOf(['offer', 'request']).required('Type is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Failed to submit post:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="title">Title</label>
            <Field type="text" name="title" />
            <ErrorMessage name="title" component="div" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Field type="text" name="description" />
            <ErrorMessage name="description" component="div" />
          </div>
          <div>
            <label htmlFor="type">Type</label>
            <Field as="select" name="type">
              <option value="offer">Offer</option>
              <option value="request">Request</option>
            </Field>
            <ErrorMessage name="type" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PostForm;

