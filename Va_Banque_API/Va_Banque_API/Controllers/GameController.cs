using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Va_Banque_API.DtoModels;
using Va_Banque_API.Interfaces;

namespace Va_Banque_API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class GameController : ControllerBase
  {
    private readonly IGameLogic _gameLogic;

    public GameController(IGameLogic gameLogic)
    {
      _gameLogic = gameLogic;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetGameAsync(Guid id)
    {
      try
      {
        var gameId = await _gameLogic.GetGameAsync(id);
        return Ok(gameId);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpPost]
    public async Task<IActionResult> CreateGameAsync(GameToCreateDto gameToCreateDto)
    {
      try
      {
        var gameId = await _gameLogic.CreateGameAsync(gameToCreateDto);
        return Ok(gameId);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> FinishGameAsync(Guid id, bool finished)
    {
      try
      {
        await _gameLogic.DeleteGameAsync(id);
        return Ok();
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
  }
}
