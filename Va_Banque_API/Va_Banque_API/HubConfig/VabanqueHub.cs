using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;
using Va_Banque_API.Models;

namespace Va_Banque_API.HubConfig
{
  public class VabanqueHub : Hub
  {
    public async Task StartConnection(string user) => await Clients.AllExcept(Context.ConnectionId)
                                                                   .SendAsync("startConnection", Context.ConnectionId, user);
    public async Task GetGameDetails(List<PlayerInGame> usery, List<object> pytania)
    {
      await Clients.AllExcept(Context.ConnectionId)
                   .SendAsync("gameDetails", usery, pytania);
    }
  }
}
