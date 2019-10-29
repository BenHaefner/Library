using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Library;

namespace Library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibraryDataController : ControllerBase
    {
        private readonly LibraryContext _context;

        public LibraryDataController(LibraryContext context)
        {
            _context = context;
        }

        // GET: api/LibraryData
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            // Return all books along with each books author list.
            return await _context.Books.Include(b => b.Authors).ToListAsync();
        }

        // GET: api/LibraryData/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            // Return specific book along with that books author list.
            var book = await _context.Books.Include(b => b.Authors).FirstOrDefaultAsync(b => b.BookId == id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        // PUT: api/LibraryData/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, Book book)
        {
            if (id != book.BookId)
            {
                return BadRequest();
            }
            // Get book that exists in context corresponding to the book being updated.
            Book existingBook = await _context.Books
                .Where(b => b.BookId == book.BookId)
                .Include(b => b.Authors)
                .SingleOrDefaultAsync();

            if (existingBook != null)
            {
                existingBook.Title = book.Title;
                existingBook.Isbn = book.Isbn;
                existingBook.Thumbnail = book.Thumbnail;
                existingBook.Read = book.Read;
                // Iterate over every author in the book from the context.
                foreach (Author author in existingBook.Authors.ToList())
                {
                    // If an author doesnt exist in the new book that did exist in the old book,
                    // delete that author.
                    if (!book.Authors.Any(a => a.AuthorID == author.AuthorID))
                        _context.Author.Remove(author);
                }
                //Iterate over every author in the updated book.
                foreach (Author authorModel in book.Authors)
                {
                    // Get the existing author from the context's book that matches the current author.
                    var existingAuthor = existingBook.Authors
                    .Where(a => a.AuthorID == authorModel.AuthorID)
                    .SingleOrDefault();
                    // If it exists, grab all of the values to be updated
                    if (existingAuthor != null)
                    {
                        existingAuthor.Name = authorModel.Name;
                    }
                    // Otherwise, the entry is new, and you should add that entry to the existing book.
                    else
                    {
                        var newAuthor = new Author
                        {
                            Name = authorModel.Name
                        };
                        existingBook.Authors.Add(newAuthor);
                    }
                }

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BookExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }



            return NoContent();
        }

        // POST: api/LibraryData
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBook", new { id = book.BookId }, book);
        }

        // DELETE: api/LibraryData/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Book>> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return book;
        }

        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.BookId == id);
        }
    }
}
