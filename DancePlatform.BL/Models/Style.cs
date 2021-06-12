using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace DancePlatform.BL.Models
{
    [JsonConverter(typeof(StringEnumConverter<,,>))]
    public enum Style
    {
        HipHop = 1,
        HighHeels,
        DanceHall,
        JazzFunk,
        Vogue,
        Contemporary,
        Afro,
        BreakDance,
        Waacking,
        Popping,
        Strip,
        FrameUp,
        House,
        Stretching,
        Choreo
    }
}
