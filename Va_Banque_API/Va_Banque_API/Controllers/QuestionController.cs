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
    public async Task<List<QuestionDto>> GetQuestionsAsync()
    {
      return await _questionLogic.GetQuestionsAsync();
    }

    [HttpGet("{id}")]
    public async Task<QuestionDto> GetQuestionAsync(Guid id)
    {
      return await _questionLogic.GetQuestionAsync(id);
    }

    [HttpPost]
    public async Task CreateQuestionAsync(QuestionDto questionDto)
    {
      await _questionLogic.CreateQuestionAsync(questionDto);
    }

    [HttpPut("{id}")]
    public async Task EditQuestionAsync(QuestionDto questionDto)
    {
      await _questionLogic.EditQuestionAsync(questionDto);
    }

    [HttpDelete("{id}")]
    public async Task DeleteQuestionAsync(Guid id)
    {
      await _questionLogic.DeleteQuestionAsync(id);
    }
  }
}
