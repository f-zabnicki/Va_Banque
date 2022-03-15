using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Va_Banque_API.DtoModels;
using Va_Banque_API.Interfaces;

namespace Va_Banque_API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CategoryController : Controller
  {
    private readonly ICategoryLogic _categoryLogic;
    public CategoryController(ICategoryLogic categoryLogic)
    {
      _categoryLogic = categoryLogic;
    }

    [HttpGet]
    public async Task<IActionResult> GetCategoriesAsync()
    {
      try
      {
        var categories = await _categoryLogic.GetCategoriesAsync();
        return Ok(categories);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategoryAsync(Guid id)
    {
      try
      {
        var category = await _categoryLogic.GetCategoryAsync(id);
        return Ok(category);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpPost]
    public async Task<IActionResult> CreateCategoryAsync(CategoryDto categoryDto)
    {
      try
      {
        await _categoryLogic.CreateCategoryAsync(categoryDto);
        return Ok();
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> RemoveCategory(Guid id)
    {
      try
      {
        await _categoryLogic.DeleteCategoryAsync(id);
        return Ok();
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
  }
}
