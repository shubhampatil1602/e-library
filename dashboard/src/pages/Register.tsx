import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const Register = () => {
  return (
    <section className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-1 xl:min-h-[800px]'>
      <div className='flex items-center justify-center py-12'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Register</h1>
            <p className='text-balance text-muted-foreground'>
              Enter your email below to Register your account
            </p>
          </div>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Name</Label>
              <Input id='name' type='text' placeholder='Jaggu Dada' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='bhidu@gmail.com'
                required
              />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password</Label>
              </div>
              <Input id='password' type='password' required />
            </div>
            <Button type='submit' className='w-full'>
              Login
            </Button>
          </div>
          <div className='mt-4 text-center text-sm'>
            Already have an account?{' '}
            <Link to='/login' className='underline'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
