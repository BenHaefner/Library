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
            return await _context.Books.Include(b => b.Authors).ToListAsync();
        }

        // GET: api/LibraryData/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
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

            Book existingBook = await _context.Books
                .Where(b => b.BookId == book.BookId)
                .Include(b => b.Authors)
                .SingleOrDefaultAsync();

            if (existingBook != null)
            {

                _context.Entry(existingBook).CurrentValues.SetValues(book);

                foreach (Author author in existingBook.Authors.ToList())
                {
                    if (!book.Authors.Any(a => a.AuthorID == author.AuthorID))
                        _context.Author.Remove(author);
                }

                foreach (Author authorModel in book.Authors)
                {
                    var existingAuthor = existingBook.Authors
                    .Where(a => a.AuthorID == authorModel.AuthorID)
                    .SingleOrDefault();

                    if (existingAuthor != null)
                    {
                        _context.Entry(existingAuthor).CurrentValues.SetValues(authorModel);
                    }
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
