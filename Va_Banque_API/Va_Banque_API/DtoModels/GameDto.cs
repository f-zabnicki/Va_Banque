using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Va_Banque_API.DtoModels
{
  public class GameDto
  {
    public Guid Id { get; set; }

    [Required]
    [MinLength(2)]
    public ICollection<PlayerInGameDto> Players { get; set; }

    [Required]
    [MinLength(25)]
    [MaxLength(25)]
    public ICollection<QuestionInGameDto> Questions { get; set; }

    [Required]
    public bool IsLive { get; set; }
  }
}
