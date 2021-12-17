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
  
  public class PlayerLogic : IPlayerLogic
  {
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    public PlayerLogic(DataContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }
    public async Task CreatePlayerAsync(PlayerDto playerForAddDto)
    {
      
      var player = _mapper.Map<PlayerDto, Player>(playerForAddDto);
    
      _context.Players.Add(player);

      await _context.SaveChangesAsync();
    }

    public async Task DeletePlayerAsync(Guid id)
    {
      var player = await _context.Players.FirstOrDefaultAsync(c => c.Id == id);
      _context.Players.Remove(player);
      await _context.SaveChangesAsync();
    }

    public async Task<ICollection<PlayerDto>> GetPlayersAsync()
    {
      var players = await _context.Players.ToListAsync();
      var mappedPlayers = _mapper.Map<ICollection<Player>, ICollection<PlayerDto>>(players);

      return mappedPlayers;
    }

    public async Task<PlayerDto> GetPlayerAsync(Guid id)
    {
      var player = await _context.Players.FirstOrDefaultAsync(c => c.Id == id);
      var mappedPlayer = _mapper.Map<Player, PlayerDto>(player);

      return mappedPlayer;
    }

    public async Task UpdatePlayerAsync(PlayerDto playerDto)
    {
       var player = await _context.Players.FirstOrDefaultAsync(c => c.Id == playerDto.Id);
      _mapper.Map<PlayerDto, Player>(playerDto, player);
      await _context.SaveChangesAsync();
    }

 
  }
}
