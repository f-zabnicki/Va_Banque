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
    public async Task<List<CategoryDto>> GetCategoriesAsync()
    {
      return await _categoryLogic.GetCategoriesAsync();
    }

    [HttpGet("{id}")]
    public async Task<CategoryDto> GetCategoryAsync(Guid id)
    {
      return await _categoryLogic.GetCategoryAsync(id);
    }

    [HttpPost]
    public async Task CreateCategoryAsync(CategoryDto categoryDto)
    {
      await _categoryLogic.CreateCategoryAsync(categoryDto);
    }

    [HttpDelete("{id}")]
    public async Task RemoveCategory(Guid id)
    {
      await _categoryLogic.DeleteCategoryAsync(id);
    }
  }
}
