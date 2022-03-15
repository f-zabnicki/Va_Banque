using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Va_Banque_API.Interfaces;

namespace Va_Banque_API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class PlayerInGameController : Controller
  {
    private readonly IPlayerInGameLogic _playerInGameLogic;
    public PlayerInGameController(IPlayerInGameLogic playerInGameLogic)
    {
      _playerInGameLogic = playerInGameLogic;
    }

    [HttpPut]
    public async Task<IActionResult> AddPointsToUserAsync(Guid id, [FromBody]int points)
    {
      try
      {
        await _playerInGameLogic.AddPointsToUserAsync(id, points);
        return Ok();
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    //[HttpPut]
    //public async Task SaveUserInfoToDataBaseAsync(Guid id)
    //{
    //  await _playerInGameLogic.SaveUserInfoToDataBaseAsync(id);
    //}

  }
}
