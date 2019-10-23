using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Library
{
    public class LibraryContext : DbContext
    {
        public DbSet<Book> Books { get; set; }
 
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlServer("Server=B-Haefner-L;Database=Library;Trusted_Connection=True");
    }
    public class Book
    {
        public int BookId { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Isbn { get; set; }
        public string Thumbnail { get; set; }
        public bool  Read { get; set; }

    }
}