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
    public async Task<GameDto> GetGameAsync(Guid id)
    {
        return await _gameLogic.GetGameAsync(id);
    }

    [HttpPost]
    public async Task<Guid> CreateGameAsync(GameToCreateDto gameToCreateDto)
    {
        return await _gameLogic.CreateGameAsync(gameToCreateDto);
        //var xd = CreatedAtAction(nameof(GetGameAsync), new { id = gameToCreateDto.Id }, gameToCreateDto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> FinishGameAsync(Guid id, bool finished)
    {
      try
      {
        await _gameLogic.DeleteGameAsync(id);
        return Ok();
      }
      catch(Exception e)
      {
        return BadRequest(e.Message);
      }
    }
  }
}
