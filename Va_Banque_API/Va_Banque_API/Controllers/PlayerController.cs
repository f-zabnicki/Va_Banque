using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Va_Banque_API.DtoModels;
using Va_Banque_API.Interfaces;

namespace Va_Banque_API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class PlayerController : Controller
  {
    private readonly IPlayerLogic _playerLogic;
    public PlayerController(IPlayerLogic playerLogic)
    {
      _playerLogic = playerLogic;
    }

    [HttpGet]
    public async Task<IActionResult> GetPlayersAsync()
    {
      try
      {
        var players = await _playerLogic.GetPlayersAsync();
        return Ok(players);
      }
      catch (InvalidOperationException e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPlayerAsync(Guid id)
    {
      try
      {
        var player = await _playerLogic.GetPlayerAsync(id);
        return Ok(player);
      }
      catch (InvalidOperationException e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpPost]
    public async Task<IActionResult> CreatePlayerAsync([FromBody] PlayerDto playerForAddDto)
    {
      try
      {
        await _playerLogic.CreatePlayerAsync(playerForAddDto);
        return Ok();
      }
      catch (InvalidOperationException e)
      {
        return BadRequest(e.Message);
      }
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> RemovePlayer(Guid id)
    {
      try
      {
        await _playerLogic.DeletePlayerAsync(id);
        return Ok();
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }

    }
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePlayer(PlayerDto playerDto)
    {
      try
      {
        await _playerLogic.UpdatePlayerAsync(playerDto);
        return Ok();
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpGet]
    [Route("best")]
    public async Task<IActionResult> GetBestUserScores(Guid id)
    {
      try
      {
        var list = await _playerLogic.GetBestUserScores(id);
        return Ok(list);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
  }
}
