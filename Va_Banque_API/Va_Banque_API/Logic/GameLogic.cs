using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Va_Banque_API.DtoModels;
using Va_Banque_API.Interfaces;
using Va_Banque_API.Models;

namespace Va_Banque_API.Logic
{
  public class GameLogic : IGameLogic
  {
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public GameLogic(DataContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public async Task<Guid> CreateGameAsync(GameToCreateDto gameToCreateDto)
    {
      List<PlayerInGame> playersInGame;
      try
      {
        playersInGame = GetPlayersInGame(gameToCreateDto);
      }
      catch (Exception)
      {
        throw;
      }

      List<QuestionInGame> questionsInGame;
      try
      {
        questionsInGame = GetQuestionsInGame(gameToCreateDto);
      }
      catch (Exception)
      {
        throw;
      }      

      var game = new Game()
      {
        //Players = playersInGame,
        Players = new List<PlayerInGame>(),
        //Questions = questionsInGame,
        Questions = new List<QuestionInGame>(),
        IsLive = true
      };

      _context.Games.Add(game);

      foreach(PlayerInGame player in playersInGame){
        game.Players.Add(player);
      }

      foreach(QuestionInGame question in questionsInGame){
        game.Questions.Add(question);
      }

      await _context.SaveChangesAsync();
      return game.Id;
    }

    public async Task<GameDto> GetGameAsync(Guid id)
    {
      var game1 = await _context.Games.Include(g => g.Players).ThenInclude(p => p.Player).
                                      Include(g => g.Questions).ThenInclude(q => q.Question).ThenInclude(q => q.Category).
                                      FirstOrDefaultAsync(g => g.Id == id);
                     
      var mappedGame = _mapper.Map<Game, GameDto>(game1);

      return mappedGame;
    }

    public async Task DeleteGameAsync(Guid id)
    {
      var game = await _context.Games.Include(g => g.Players).ThenInclude(p => p.Player).FirstOrDefaultAsync(g => g.Id == id);

      if (game == null)
        throw new Exception("Game not found.");

      //if (game.IsLive)
        //throw new InvalidOperationException("You can't delete a game that is still in progress.");

      SaveRankingPoints(game);
      game.IsLive = false;

      //_context.Games.Remove(game);

      await _context.SaveChangesAsync();
    }

    private static void SaveRankingPoints(Game game)
    {
      foreach(var playerInGame in game.Players)
      {
        playerInGame.Player.SumOfPoints += playerInGame.Points;
      }
    }

    private List<PlayerInGame> GetPlayersInGame(GameToCreateDto gameToCreateDto)
    {
      List<Player> players = new List<Player>();
      foreach (var player in gameToCreateDto.Players)
      {
        players.Add(_context.Players.FirstOrDefault(p => p.Id == player.Id));
      }

      //var players = _mapper.Map<ICollection<PlayerDto>, ICollection<Player>>(gameToCreateDto.Players);

      if (players.Count < 2)
        throw new InvalidOperationException("The game needs at least 2 players.");

      List<PlayerInGame> playersInGame = new();

      foreach (Player player in players)
      {
        playersInGame.Add(new PlayerInGame() { Player = player, Points = 0 });
      }

      return playersInGame;
    }

    private List<QuestionInGame> GetQuestionsInGame(GameToCreateDto gameToCreateDto)
    {
      List<List<Question>> allQuestionsFromCategories = GetAllQuestionsFromCategories(gameToCreateDto);

      List<int> pointsNumbers = new() { 100, 150, 200, 250, 300 };

      List<QuestionInGame> questionsInGame = new();
      Random rnd = new();

      foreach (List<Question> questionsFromCategory in allQuestionsFromCategories)
      {
        foreach (int points in pointsNumbers)
        {
          try
          {
            questionsInGame.Add(GetRandomQuestion(questionsFromCategory, points, rnd));
          }
          catch(Exception)
          {
            throw;
          }
        }
      }
      return questionsInGame;
    }

    private static QuestionInGame GetRandomQuestion(List<Question> questionsFromCategory, int points, Random rnd)
    {
      var questions = questionsFromCategory.Where(q => q.Points == points).ToList();
      var size = questions.Count;

      if (size < 1)
        throw new InvalidOperationException($"One of selected categories has too few questions.");

      int index = rnd.Next(size);

      return new QuestionInGame() { Question = questions[index], Status = QuestionStatus.BLUE };
    }

    private List<List<Question>> GetAllQuestionsFromCategories(GameToCreateDto gameToCreateDto)
    {
      var categories = _mapper.Map<ICollection<CategoryDto>, ICollection<Category>>(gameToCreateDto.Categories);

      List<List<Question>> result = new();

      foreach (Category category in categories)
      {
        result.Add(_context.Questions.Include(c => c.Category).Where(q => q.Category == category).ToList());
      }

      return result;
    }
  }
}
