using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Va_Banque_API.Interfaces;
using Va_Banque_API.Models;

namespace Va_Banque_API.Logic
{
  public class AccountLogic : IAccountLogic
  {
    private readonly DataContext _context;
    private List<Player> loggedUsers = new List<Player>();

    public AccountLogic(DataContext context)
    {
      _context = context;
    }
    public async Task<Player> GetAccountDetails(Guid id)
    {
      var account = await _context.Players.FirstOrDefaultAsync(p => p.Id == id);
      return account;
    }

    public async Task<Player> Login(Credentials credentials)
    {
      var account = await _context.Players.FirstOrDefaultAsync(p => p.Name.ToLower() == credentials.Username.ToLower() && p.Password == credentials.Password);
      loggedUsers.Add(account);
      await _context.SaveChangesAsync();

      return account;
    }

    public async Task Logout(Guid id)
    {
      var account = await _context.Players.FirstOrDefaultAsync(p => p.Id == id);
      loggedUsers.Remove(account);
      await _context.SaveChangesAsync();
    }
  }
}
