using System;
using System.ComponentModel.DataAnnotations;

namespace Va_Banque_API.Models
{
    public class Question
    {
        public Guid Id { get; set; }
        public Guid CategoryId { get; set; }
        [Required]
        public Category Category { get; set; }

        [Required]
        public int Points { get; set; }

        [Required]
        [MaxLength(100)]
        public string Content { get; set; }

        [Required]
        [MaxLength(100)]
        public string Answer { get; set; }
    }
}
