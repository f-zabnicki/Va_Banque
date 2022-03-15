using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Va_Banque_API.DtoModels;
using Va_Banque_API.Interfaces;

namespace Va_Banque_API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class QuestionController : Controller
  {
    private readonly IQuestionLogic _questionLogic;
    public QuestionController(IQuestionLogic questionLogic)
    {
      _questionLogic = questionLogic;
    }

    [HttpGet]
    public async Task<IActionResult> GetQuestionsAsync()
    {
      try
      {
        var list = await _questionLogic.GetQuestionsAsync();
        return Ok(list);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetQuestionAsync(Guid id)
    {
      try
      {
        var question = await _questionLogic.GetQuestionAsync(id);
        return Ok(question);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpPost]
    public async Task<IActionResult> CreateQuestionAsync(QuestionDto questionDto)
    {
      try
      {
        await _questionLogic.CreateQuestionAsync(questionDto);
        return Ok();
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditQuestionAsync(QuestionDto questionDto)
    {
      try
      {
        await _questionLogic.EditQuestionAsync(questionDto);
        return Ok();
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteQuestionAsync(Guid id)
    {
      try
      {
        await _questionLogic.DeleteQuestionAsync(id);
        return Ok();
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
  }
}
