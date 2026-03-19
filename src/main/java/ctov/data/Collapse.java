package ctov.data;

import ctov.api.dto.CollapseDto;

public class Collapse {
    private final StellarMass stellarMass = new StellarMass();

    public CollapseDto collapse(double solarMass) {
        CollapseDto dto = new CollapseDto();

        if (solarMass < Constants.CHANDRASEKHAR_LIMIT_SOLAR) {
            dto.remnantAfterCollapse = RemnantType.WHITE_DWARF.getRemnantType();
            dto.remnantSolarMass = stellarMass.whiteDwarfSolarMass();
            return dto;
        }

        if (solarMass < Constants.TOV_LIMIT_SOLAR) {
            dto.remnantAfterCollapse = RemnantType.NEUTRON_STAR.getRemnantType();
            dto.remnantSolarMass = stellarMass.neutronStarSolarMass();
            return dto;
        }

        dto.remnantAfterCollapse = RemnantType.BLACK_HOLE.getRemnantType();
        dto.remnantSolarMass = stellarMass.blackHoleSolarMass();
        return dto;
    }
}
