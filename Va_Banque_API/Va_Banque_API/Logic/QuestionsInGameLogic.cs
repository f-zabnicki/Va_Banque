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
  public class QuestionsInGameLogic : IQuestionsInGameLogic
  {
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public QuestionsInGameLogic(DataContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public async Task ChangeQuestionStatusAsync(Guid id, bool correct)
    {
      var toBeChanged = await _context.QuestionsInGame.FirstOrDefaultAsync(q=> q.Id == id);
      switch (correct)
      {
        case true:
          toBeChanged.Status = QuestionStatus.GREEN;
          break;
        case false:
          toBeChanged.Status = QuestionStatus.RED;
          break;
        default:
          throw new NotSupportedException("Can't change status");
      }

      await _context.SaveChangesAsync();
    }

    public async Task<List<QuestionInGame>> GetQuestionsAsync(Guid id)
    {
      var game = await _context.Games.FirstOrDefaultAsync(g => g.Id == id);
      return game.Questions.ToList();
    }
  }
}
