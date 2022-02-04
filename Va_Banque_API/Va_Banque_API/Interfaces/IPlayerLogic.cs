using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Va_Banque_API.DtoModels;

namespace Va_Banque_API.Interfaces
{
  public interface IPlayerLogic
  {
    Task<ICollection<PlayerDto>> GetPlayersAsync();
    Task<PlayerDto> GetPlayerAsync(Guid id);
    Task CreatePlayerAsync(PlayerDto playerForAddDto);
    Task DeletePlayerAsync(Guid id);
    Task UpdatePlayerAsync(PlayerDto playerDto);
  }
}