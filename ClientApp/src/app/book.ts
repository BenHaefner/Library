import { Author } from './author';

export class Book {
    bookId?: number;
    title: string;
    authors: Author[];
    isbn: string;
    read: boolean;
    thumbnail: string;
}
