using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Va_Banque_API.DtoModels;
using Va_Banque_API.Interfaces;
using Va_Banque_API.Models;

namespace Va_Banque_API.Logic
{
  public class CategoryLogic : ICategoryLogic
  {
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    public CategoryLogic(DataContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }
    public async Task CreateCategoryAsync(CategoryDto categoryDto)
    {
      var category = _mapper.Map<CategoryDto, Category>(categoryDto);
      _context.Categories.Add(category);

      await _context.SaveChangesAsync();
    }

    public async Task DeleteCategoryAsync(Guid id)
    {
      var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
      _context.Categories.Remove(category);

      await _context.SaveChangesAsync();
    }

    public async Task<List<CategoryDto>> GetCategoriesAsync()
    {
      var categories = await _context.Categories.ToListAsync();
      var mappedCategories = _mapper.Map<List<Category>, List<CategoryDto>>(categories);

      return mappedCategories;
    }

    public async Task<CategoryDto> GetCategoryAsync(Guid id)
    {
      var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
      var mappedCategory = _mapper.Map<Category, CategoryDto>(category);

      return mappedCategory;
    }
  }
}
