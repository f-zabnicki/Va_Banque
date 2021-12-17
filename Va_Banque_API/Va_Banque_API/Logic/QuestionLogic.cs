using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Va_Banque_API.DtoModels;
using Va_Banque_API.Interfaces;
using Va_Banque_API.Models;

namespace Va_Banque_API.Logic
{
  public class QuestionLogic : IQuestionLogic
  {
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    public QuestionLogic(DataContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }
    public async Task CreateQuestionAsync(QuestionDto questionDto)
    {
      var question = _mapper.Map<QuestionDto, Question>(questionDto);
      question.Category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == questionDto.Id);
      _context.Questions.Add(question);

      await _context.SaveChangesAsync();
    }

    public async Task DeleteQuestionAsync(Guid id)
    {
      var question = await _context.Questions.FirstOrDefaultAsync(q => q.Id == id);
      _context.Remove(question);

      await _context.SaveChangesAsync();
    }

    public async Task EditQuestionAsync(QuestionDto questionDto)
    {
      var question = await _context.Questions.FirstOrDefaultAsync(q => q.Id == questionDto.Id);
      _mapper.Map<QuestionDto, Question>(questionDto, question);

      await _context.SaveChangesAsync();
    }

    public async Task<QuestionDto> GetQuestionAsync(Guid id)
    {
      var question = await _context.Questions.FirstOrDefaultAsync(q => q.Id == id);
      var mappedQuestion = _mapper.Map<Question, QuestionDto>(question);

      return mappedQuestion;
    }

    public async Task<List<QuestionDto>> GetQuestionsAsync()
    {
      var questions = await _context.Questions.ToListAsync();
      var mappedQuestions = _mapper.Map<List<Question>, List<QuestionDto>>(questions);

      return mappedQuestions;
    }
  }
}
