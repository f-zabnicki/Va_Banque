using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Va_Banque_API.DtoModels;

namespace Va_Banque_API.Interfaces
{
  public interface IQuestionLogic
  {
    Task<List<QuestionDto>> GetQuestionsAsync();
    Task<QuestionDto> GetQuestionAsync(Guid id);
    Task CreateQuestionAsync(QuestionDto questionDto);
    Task EditQuestionAsync(QuestionDto questionDto);
    Task DeleteQuestionAsync(Guid id);
  }
}
