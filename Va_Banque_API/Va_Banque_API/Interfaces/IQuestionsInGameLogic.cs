using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Va_Banque_API.DtoModels;
using Va_Banque_API.Models;

namespace Va_Banque_API.Interfaces
{
  public interface IQuestionsInGameLogic
  {
    Task<List<QuestionInGame>> GetQuestionsAsync(Guid id);
    Task ChangeQuestionStatusAsync(Guid id, bool correct);
  }
}
