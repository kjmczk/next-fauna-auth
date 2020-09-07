import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { gql } from 'graphql-request';
import { useForm } from 'react-hook-form';
import utilStyles from '../styles/utils.module.css';
import { graphQLClient } from '../utils/graphql-client';

const EditForm = ({ defaultValues, id, token }) => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');

  const { handleSubmit, register, reset, errors } = useForm({
    defaultValues: {
      ...defaultValues,
    },
  });

  const onSubmit = handleSubmit(async ({ task, completed }) => {
    if (errorMessage) setErrorMessage('');

    const mutation = gql`
      mutation UpdateATodo($id: ID!, $task: String!, $completed: Boolean!) {
        updateTodo(id: $id, data: { task: $task, completed: $completed }) {
          task
          completed
        }
      }
    `;

    const variables = {
      id,
      task,
      completed,
    };

    try {
      await graphQLClient(token).request(mutation, variables);
      router.push('/');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  });

  useEffect(() => {
    reset(defaultValues); // asynchronously reset your form values
  }, [reset, defaultValues]);

  return (
    <>
      <form onSubmit={onSubmit} className={utilStyles.form}>
        <div>
          <label>Task</label>
          <input
            type="text"
            name="task"
            ref={register({ required: 'Task is required' })}
          />
          {errors.task && (
            <span role="alert" className={utilStyles.error}>
              {errors.task.message}
            </span>
          )}
        </div>

        <div>
          <label>Completed</label>
          <input type="checkbox" name="completed" ref={register()} />
          {errors.completed && (
            <span role="alert" className={utilStyles.error}>
              {errors.completed.message}
            </span>
          )}
        </div>

        <div className={utilStyles.submit}>
          <button type="submit">Update</button>
        </div>
      </form>

      {errorMessage && (
        <p role="alert" className={utilStyles.errorMessage}>
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default EditForm;
