using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Va_Banque_API.DtoModels
{
  public class GameToCreateDto
  {
    public Guid Id { get; set; }

    [Required]
    [MinLength(2)]
    public ICollection<PlayerDto> Players { get; set; }

    [Required]
    [MinLength(5)]
    [MaxLength(5)]
    public ICollection<CategoryDto> Categories { get; set; }
  }
}
