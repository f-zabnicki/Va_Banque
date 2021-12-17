using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Va_Banque_API.DtoModels
{
  public class PlayerDto
  {
    public Guid Id { get; set; }

    [Required]
    [MaxLength(20)]
    public string Name { get; set; }

    public int SumOfPoints { get; set; }
  }
}
