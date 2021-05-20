import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';

const Signup = () => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (formData) => {
    if (errorMessage) setErrorMessage('');

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  });

  return (
    <Layout>
      <h1>Sign Up</h1>

      <form onSubmit={onSubmit} className={utilStyles.form}>
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="e.g. john@example.com"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && (
            <span role="alert" className={utilStyles.error}>
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="e.g. John-1234"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <span role="alert" className={utilStyles.error}>
              {errors.password.message}
            </span>
          )}
        </div>

        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="e.g. John-1234"
            {...register('password2', {
              validate: (value) =>
                value === watch('password') || 'Passwords do not match',
            })}
          />
          {errors.password2 && (
            <span role="alert" className={utilStyles.error}>
              {errors.password2.message}
            </span>
          )}
        </div>

        <div className={utilStyles.submit}>
          <button type="submit">Sign up</button>
        </div>
      </form>

      {errorMessage && (
        <p role="alert" className={utilStyles.errorMessage}>
          {errorMessage}
        </p>
      )}
    </Layout>
  );
};

export default Signup;
