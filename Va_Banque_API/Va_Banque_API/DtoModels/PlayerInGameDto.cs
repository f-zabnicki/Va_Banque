using System;
using System.ComponentModel.DataAnnotations;

namespace Va_Banque_API.DtoModels
{
  public class PlayerInGameDto
  {
    public Guid Id { get; set; }

    public PlayerDto Player { get; set; }

    [Required]
    public int Points { get; set; }
  }
}
