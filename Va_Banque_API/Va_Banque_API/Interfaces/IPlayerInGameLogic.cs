using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Va_Banque_API.Interfaces
{
  public interface IPlayerInGameLogic
  {
    Task AddPointsToUserAsync(Guid userID, int points);
    Task SaveUserInfoToDataBaseAsync(Guid userID);
  }
}
