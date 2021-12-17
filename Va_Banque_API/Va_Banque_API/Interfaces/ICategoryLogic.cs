using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Va_Banque_API.DtoModels;

namespace Va_Banque_API.Interfaces
{
  public interface ICategoryLogic
  {
    Task<List<CategoryDto>> GetCategoriesAsync();
    Task<CategoryDto> GetCategoryAsync(Guid id);
    Task CreateCategoryAsync(CategoryDto categoryDto);
    Task DeleteCategoryAsync(Guid id);
  }
}
