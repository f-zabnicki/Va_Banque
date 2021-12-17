using System;
using System.ComponentModel.DataAnnotations;

namespace Va_Banque_API.DtoModels
{
  public class QuestionDto
  {
    public Guid Id { get; set; }

    [Required]
    public Guid CategoryId { get; set; }

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
