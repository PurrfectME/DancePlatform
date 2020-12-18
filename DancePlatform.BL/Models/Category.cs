using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace DancePlatform.BL.Models
{
    [JsonConverter(typeof(StringEnumConverter<,,>))]
    public enum Category
    {
        Open = 1,
        Beg = 2,
        Pro = 3,
    }
}
