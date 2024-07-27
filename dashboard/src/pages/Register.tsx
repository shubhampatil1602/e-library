import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { register } from '../api';
import { LoaderCircle } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate('/dashboard/home');
    },
  });

  const handleRegisterSubmit = async () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!name || !email || !password) {
      return alert('Please enter name, email and password.');
    }
    mutation.mutate({ name, email, password });
  };

  return (
    <section className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-1 xl:min-h-[800px]'>
      <div className='flex items-center justify-center py-12'>
        <div className='mx-auto grid w-[360px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Register</h1>
            <p className='text-balance text-muted-foreground'>
              Enter your email below to Register your account. <br />
              {mutation.isError && (
                <span className='text-red-500'>{mutation.error.message}</span>
              )}
            </p>
          </div>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Name</Label>
              <Input
                ref={nameRef}
                id='name'
                type='text'
                placeholder='Jaggu Dada'
                required
              />
            </div>
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
              <Input ref={passwordRef} id='password' type='password' required />
            </div>
            <Button
              onClick={handleRegisterSubmit}
              type='submit'
              className='w-full'
              disabled={mutation.isPending}
            >
              {mutation.isPending && <LoaderCircle className='animate-spin' />}
              <span>Register</span>
            </Button>
          </div>
          <div className='mt-4 text-center text-sm'>
            Already have an account?{' '}
            <Link to='/auth/login' className='underline'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
