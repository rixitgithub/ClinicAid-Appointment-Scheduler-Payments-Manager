import React, { useState } from 'react';
import useUserAPI from '../api/userAPI.js';

const Login = () => {
  const [state, setState] = useState('Sign Up'); // Toggle between 'Login' and 'Sign Up'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false); // Loader

  const { login, register } = useUserAPI();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);

    try {
      if (state === 'Login') {
        await login({ email, password });
        window.location.reload(); // Refresh on successful login
      } else {
        await register({ email, password, name });
        setState('Login'); // Switch to login after signup
        setName('');
        setPassword('');
        setEmail('');
        setInfo('Account created successfully. Please login.');
      }
    } catch (err) {
      console.error('Error during auth:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center"
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </p>
        <p>
          Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment
        </p>

        {info && (
          <div className="text-sm text-green-600 w-full">{info}</div>
        )}

        {state === 'Sign Up' && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        {error && (
          <div className="text-sm text-red-500 w-full">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`text-white text-base w-full py-2 rounded-md ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary'
          }`}
        >
          {loading
            ? state === 'Login'
              ? 'Signing in...'
              : 'Creating account...'
            : state === 'Sign Up'
            ? 'Create Account'
            : 'Login'}
        </button>

        {state === 'Sign Up' ? (
          <p>
            Already have an account?{' '}
            <span
              onClick={() => {
                setState('Login');
                setError('');
                setInfo('');
              }}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{' '}
            <span
              onClick={() => {
                setState('Sign Up');
                setError('');
                setInfo('');
              }}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
