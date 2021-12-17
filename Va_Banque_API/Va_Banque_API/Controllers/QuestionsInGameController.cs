using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Va_Banque_API.DtoModels;
using Va_Banque_API.Interfaces;
using Va_Banque_API.Models;

namespace Va_Banque_API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class QuestionsInGameController : Controller
  {
    private readonly IQuestionsInGameLogic _questionsInGameLogic;
    public QuestionsInGameController(IQuestionsInGameLogic questionsInGameLogic)
    {
      _questionsInGameLogic = questionsInGameLogic;
    }
    [HttpPut]
    public async Task ChangeQuestionStatus(Guid id, [FromBody] bool correct)
    {
      await _questionsInGameLogic.ChangeQuestionStatusAsync(id, correct);
    }
    [HttpGet]
    public async Task<List<QuestionInGame>> GetQuestionsAsync(Guid id)
    {
      return await _questionsInGameLogic.GetQuestionsAsync(id);
    }

  }
}
