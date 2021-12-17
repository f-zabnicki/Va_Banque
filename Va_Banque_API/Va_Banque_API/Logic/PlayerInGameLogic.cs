using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Va_Banque_API.Interfaces;
using Va_Banque_API.Models;

namespace Va_Banque_API.Logic
{
  public class PlayerInGameLogic : IPlayerInGameLogic
  {
    private readonly DataContext _context;
    public PlayerInGameLogic(DataContext context)
    {
      _context = context;
    }

    public async Task AddPointsToUserAsync(Guid userID, int points)
    {
      var toBeUpdated = await _context.PlayersInGame.FirstOrDefaultAsync(p => p.Id == userID);
      toBeUpdated.Points += points;

      await _context.SaveChangesAsync();
    }

    public async Task SaveUserInfoToDataBaseAsync(Guid userID)
    {
      var playerInGame = await _context.PlayersInGame.FirstOrDefaultAsync(p => p.Player.Id == userID);
      var toBeUpdated = await _context.Players.FirstOrDefaultAsync(p => p.Id == userID);
      toBeUpdated.SumOfPoints += playerInGame.Points;

      await _context.SaveChangesAsync();
    }
  }
}
