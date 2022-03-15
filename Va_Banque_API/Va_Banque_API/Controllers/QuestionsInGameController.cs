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
    public async Task<IActionResult> ChangeQuestionStatus(Guid id, [FromBody] bool correct)
    {
      try
      {
        await _questionsInGameLogic.ChangeQuestionStatusAsync(id, correct);
        return Ok();
      }
      catch (Exception e)
      {
        return BadRequest(e);
      }
    }
    [HttpGet]
    public async Task<IActionResult> GetQuestionsAsync(Guid id)
    {
      try
      {
        var list = await _questionsInGameLogic.GetQuestionsAsync(id);
        return Ok(list);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
  }
}
