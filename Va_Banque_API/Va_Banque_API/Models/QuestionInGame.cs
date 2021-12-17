using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Va_Banque_API.Models
{
    public class QuestionInGame
    {
        public Guid Id { get; set; }

        [Required]
        public Question Question { get; set; }

        [Required]
        public QuestionStatus Status { get; set; }
    }
}
