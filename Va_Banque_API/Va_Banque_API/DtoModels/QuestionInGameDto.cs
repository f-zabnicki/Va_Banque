using System;
using System.ComponentModel.DataAnnotations;

namespace Va_Banque_API.DtoModels
{
  public class QuestionInGameDto
  {
    public Guid Id { get; set; }

    [Required]
    public QuestionDto Question { get; set; }

    [Required]
    public QuestionStatusDto Status { get; set; }
  }
}
