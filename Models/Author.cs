using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.Extensions.Configuration;

namespace Library
{
    public class Author
    {
        public int AuthorID { get; set; }
        public string Name { get; set; }

        //Foreign key for Book
        [ForeignKey("Book")]
        public int BookId { get; set; }
        public virtual Book Book { get; set; }

    }
}