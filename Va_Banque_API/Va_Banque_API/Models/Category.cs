using System;
using System.ComponentModel.DataAnnotations;

namespace Va_Banque_API.Models
{
    public class Category
    {
        public Guid Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
    }
}
