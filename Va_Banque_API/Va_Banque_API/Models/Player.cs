using System;
using System.ComponentModel.DataAnnotations;

namespace Va_Banque_API.Models
{
    public class Player
    {
        public Guid Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Name { get; set; }

        public int SumOfPoints { get; set; }
    }
}
