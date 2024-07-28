import { useQuery } from '@tanstack/react-query';
import { getBooks } from '../api';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../components/ui/breadcrumb';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent } from '../components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Button } from '../components/ui/button';
import {
  Frown,
  ListFilter,
  LoaderCircle,
  MoreHorizontal,
  PlusCircle,
} from 'lucide-react';
import { BookType } from '../types';

const BooksPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
    staleTime: 10000,
  });
  console.log(data);
  return (
    <div>
      <div>
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
                <BreadcrumbPage>Books</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className='ml-auto flex items-center gap-2'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm' className='h-8 gap-1'>
                  <ListFilter className='h-3.5 w-3.5' />
                  <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button size='sm' className='h-8 gap-1'>
              <PlusCircle className='h-3.5 w-3.5' />
              <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                Add Book
              </span>
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue='all' className='mt-6'>
        <TabsContent value='all'>
          <Card x-chunk='dashboard-06-chunk-0'>
            <CardHeader>
              <CardTitle>Books</CardTitle>
              <CardDescription>
                Manage your books and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='hidden w-[100px] sm:table-cell'>
                      <span className='sr-only'>Image</span>
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead className='hidden md:table-cell'>
                      Author Name
                    </TableHead>
                    <TableHead className='hidden md:table-cell'>
                      Created at
                    </TableHead>
                    <TableHead>
                      <span className='sr-only'>Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading && (
                    <div className='h-[30vh] w-[80vw] flex justify-center items-center gap-3'>
                      <LoaderCircle className='animate-spin' size={30} />
                      <span className='text-xl'>Loading...</span>
                    </div>
                  )}
                  {isError && (
                    <div className='h-[30vh] w-[80vw] flex justify-center items-center gap-3'>
                      <Frown className='animate-spin' size={30} />
                      <span className='text-xl'>
                        Error while fetching data.
                      </span>
                    </div>
                  )}
                  {data?.data.map((book: BookType) => (
                    <TableRow key={book._id}>
                      <TableCell className='hidden sm:table-cell'>
                        <img
                          alt={book.title}
                          className='aspect-square rounded-md object-cover'
                          height='64'
                          src={book.coverImage}
                          width='64'
                        />
                      </TableCell>
                      <TableCell className='font-medium'>
                        {book.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant='outline'>{book.genre}</Badge>
                      </TableCell>
                      <TableCell className='hidden md:table-cell'>
                        {book.author.name}
                      </TableCell>
                      <TableCell className='hidden md:table-cell'>
                        {book.createdAt}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup='true'
                              size='icon'
                              variant='ghost'
                            >
                              <MoreHorizontal className='h-4 w-4' />
                              <span className='sr-only'>Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className='text-xs text-muted-foreground'>
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BooksPage;
