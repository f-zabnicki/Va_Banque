using AutoMapper;
using Va_Banque_API.DtoModels;
using Va_Banque_API.Models;

namespace Va_Banque_API.Mapper
{
  public class MappingProfile : Profile
  {
    public MappingProfile()
    {
      CreateMap<Category, CategoryDto>().ReverseMap();
      CreateMap<Player, PlayerDto>().ReverseMap();
      CreateMap<Question, QuestionDto>().ReverseMap();
      CreateMap<QuestionStatus, QuestionStatusDto>().ReverseMap();
      CreateMap<PlayerInGame, PlayerInGameDto>().ReverseMap();
      CreateMap<QuestionInGame, QuestionInGameDto>().ReverseMap();
      CreateMap<Game, GameDto>().ReverseMap();
    }
  }
}
