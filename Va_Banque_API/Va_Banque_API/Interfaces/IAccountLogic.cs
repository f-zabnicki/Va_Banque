using System;
using System.Threading.Tasks;
using Va_Banque_API.Models;

namespace Va_Banque_API.Interfaces
{
  public interface IAccountLogic
  {
    Task<Player> Login(Credentials credentials);
    Task Logout(Guid id);
    Task<Player> GetAccountDetails(Guid id);

  }
}
