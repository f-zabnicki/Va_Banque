using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Va_Banque_API.Interfaces;
using Va_Banque_API.Models;

namespace Va_Banque_API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AccountController : Controller
  {
    private IAccountLogic _accountLogic;
    public AccountController(IAccountLogic accountLogic)
    {
      _accountLogic = accountLogic;
    }
    [HttpGet]
    public async Task<IActionResult> Login([FromBody] Credentials credentials)
    {
      try
      {
        var player = await _accountLogic.Login(credentials);
        return Ok(player);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
    [HttpPut]
    public async Task<IActionResult> Logout(Guid id)
    {
      try
      {
        await _accountLogic.Logout(id);
        return Ok();
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetAccountDetails(Guid id)
    {
      try
      {
        var player = await _accountLogic.GetAccountDetails(id);
        return Ok(player);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
  }
}
