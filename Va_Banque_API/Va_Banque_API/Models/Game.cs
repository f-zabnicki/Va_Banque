using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Va_Banque_API.Models
{
    public class Game
    {
        public Guid Id { get; set; }

        [Required]
        //[MinLength(2)]
        public ICollection<PlayerInGame> Players { get; set; }

        [Required]
        //[MinLength(25)]
        //[MaxLength(25)]
        public ICollection<QuestionInGame> Questions { get; set; }

        [Required]
        public bool IsLive { get; set; }
    }
}
