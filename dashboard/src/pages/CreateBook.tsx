import { Link, useNavigate } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../components/ui/breadcrumb';
import { Button } from '../components/ui/button';
import { LoaderCircle, PlusCircle, X } from 'lucide-react';
import { Tabs } from '../components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBook } from '../api';

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters',
  }),
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters',
  }),
  genre: z.string().min(2, {
    message: 'Genre is required',
  }),
  coverImage: z.instanceof(FileList).refine((file) => {
    return file.length === 1;
  }, 'Cover image is required'),
  file: z.instanceof(FileList).refine((file) => {
    return file.length === 1;
  }, 'book pdf is required'),
});

const CreateBook = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      genre: '',
    },
  });

  const coverImageRef = form.register('coverImage');
  const bookRef = form.register('file');

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      console.log('book created');
      form.reset();
      navigate('/dashboard/books');
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('genre', values.genre);
    formData.append('coverImage', values.coverImage[0]);
    formData.append('file', values.file[0]);

    mutation.mutate(formData);
    console.log(values);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='ml-auto flex justify-between items-center gap-2'>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link to='/dashboard/home'>Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link to='/dashboard/books'>Books</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Create</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className='ml-auto flex items-center gap-2'>
              <Button variant={'outline'} size='sm' className='h-8 gap-1'>
                <X className='h-3.5 w-3.5' />
                <Link
                  to={'/dashboard/books'}
                  className='sr-only sm:not-sr-only sm:whitespace-nowrap'
                >
                  Cancel
                </Link>
              </Button>
              <Button size='sm' className='h-8 gap-1'>
                <PlusCircle className='h-3.5 w-3.5' />
                <Button
                  type='submit'
                  className='sr-only sm:not-sr-only sm:whitespace-nowrap flex items-center gap-3'
                  disabled={mutation.isPending}
                >
                  {mutation.isPending && (
                    <LoaderCircle
                      className={`${
                        mutation.isPending ? 'hidden' : 'animate-spin'
                      }`}
                    />
                  )}
                  <span>Save</span>
                </Button>
              </Button>
            </div>
          </div>

          <Tabs defaultValue='all' className='mt-6'>
            <Card x-chunk='dashboard-06-chunk-0'>
              <CardHeader>
                <CardTitle>Create a new book</CardTitle>
                <CardDescription>
                  Fill out the form below to create a new book.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className='grid gap-6'>
                  <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className='grid gap-3'>
                            <Label htmlFor='title'>Title</Label>
                            <Input
                              {...field}
                              type='text'
                              className='w-full'
                              placeholder='Book name'
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='genre'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className='grid gap-3'>
                            <Label htmlFor='genre'>Genre</Label>
                            <Input
                              {...field}
                              type='text'
                              className='w-full'
                              placeholder='genre'
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='coverImage'
                    render={() => (
                      <FormItem>
                        <FormControl>
                          <div className='grid gap-3'>
                            <Label htmlFor='coverImage'>Cover Image</Label>
                            <Input
                              {...coverImageRef}
                              type='file'
                              className='w-full'
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='file'
                    render={() => (
                      <FormItem>
                        <FormControl>
                          <div className='grid gap-3'>
                            <Label htmlFor='file'>Book PDF</Label>
                            <Input
                              {...bookRef}
                              type='file'
                              className='w-full'
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className='grid gap-3'>
                            <Label htmlFor='description'>Description</Label>
                            <Textarea
                              id='description'
                              className='min-h-32'
                              {...field}
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </Tabs>
        </form>
      </Form>
    </div>
  );
};

export default CreateBook;
