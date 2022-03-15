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
      account.LoggedIn = true;
      await _context.SaveChangesAsync();

      return account;
    }

    public async Task Logout(Guid id)
    {
      var account = await _context.Players.FirstOrDefaultAsync(p => p.Id == id);
      account.LoggedIn = false;
      await _context.SaveChangesAsync();
    }
  }
}
