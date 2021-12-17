using System;
using System.Threading.Tasks;
using Va_Banque_API.DtoModels;

namespace Va_Banque_API.Interfaces
{
  public interface IGameLogic
  {
    Task<Guid> CreateGameAsync(GameToCreateDto gameToCreateDto);
    Task<GameDto> GetGameAsync(Guid id);
    Task DeleteGameAsync(Guid id);
  }
}
