using System.Collections.Generic;
using Microsoft.Extensions.Configuration;

namespace Library
{
    public class Book
    {
        public int BookId { get; set; }
        public string Title { get; set; }
        public string Isbn { get; set; }
        public string Thumbnail { get; set; }
        public bool Read { get; set; }

        public List<Author> Authors { get; set; }

    }
}