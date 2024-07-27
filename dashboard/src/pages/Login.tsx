import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { login } from '../api';
import { LoaderCircle } from 'lucide-react';
import useTokenStore from '../store';

const Login = () => {
  const navigate = useNavigate();
  const setToken = useTokenStore((state) => state.setToken);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      setToken(response.data.accessToken);
      navigate('/dashboard/home');
    },
  });

  const handleLoginSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      return alert('Please enter email and password.');
    }
    mutation.mutate({ email, password });
  };

  return (
    <section className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-1 xl:min-h-[800px]'>
      <div className='flex items-center justify-center py-12'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Login</h1>
            <p className='text-balance text-muted-foreground'>
              Enter your email below to login to your account.
              <br />
              {mutation.isError && (
                <span className='text-red-500'>{mutation.error.message}</span>
              )}
            </p>
          </div>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='bhidu@gmail.com'
                required
                ref={emailRef}
              />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password</Label>
              </div>
              <Input id='password' type='password' required ref={passwordRef} />
            </div>
            <Button
              onClick={handleLoginSubmit}
              type='submit'
              className='w-full flex items-center gap-3'
              disabled={mutation.isPending}
            >
              {mutation.isPending && <LoaderCircle className='animate-spin' />}
              <span>Login</span>
            </Button>
          </div>
          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link to='/auth/register' className='underline'>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
