using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Va_Banque_API.DtoModels;
using Va_Banque_API.Interfaces;
using Va_Banque_API.Models;

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
      try {
        var players = await _playerLogic.GetPlayersAsync();
        return Ok(players);
      } 
      catch(InvalidOperationException e)
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
    public async Task RemovePlayer(Guid id)
    {
        await _playerLogic.DeletePlayerAsync(id);
    }
    [HttpPut("{id}")]
    public async Task UpdatePlayer(PlayerDto playerDto)
    {
       await _playerLogic.UpdatePlayerAsync(playerDto);
    }

    [HttpPost]
    [Route("login")]
    public async Task<Player> LoginUser(Credentials credentials)
    {
      var player = await _playerLogic.LoginPlayer(credentials);
      return player;
    }

    [HttpGet]
    [Route("best")]
    public async Task<List<int>> GetBestUserScores(Guid id)
    {
      var list = await _playerLogic.GetBestUserScores(id);
      return list;
    }
  }
}
