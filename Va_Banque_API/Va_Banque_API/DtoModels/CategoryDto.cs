using System;
using System.ComponentModel.DataAnnotations;

namespace Va_Banque_API.DtoModels
{
  public class CategoryDto
  {
    public Guid Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Name { get; set; }
  }
}
