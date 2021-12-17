using System;
using System.ComponentModel.DataAnnotations;

namespace Va_Banque_API.Models
{
    public class PlayerInGame
    {
        public Guid Id { get; set; }
        public Player Player { get; set; }

        [Required]
        public int Points { get; set; }
    }
}
