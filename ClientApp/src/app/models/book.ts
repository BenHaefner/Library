import { Author } from './author';

/**
 *  This class is a 
 */
export class Book {
    bookId?: number;
    title: string;
    authors: Author[];
    isbn: string;
    read: boolean;
    thumbnail: string;
}
