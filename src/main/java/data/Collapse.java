package data;

import static data.Stars.*;
import static data.StellarMass.*;
import static tools.Converter.starMassKgToSolarMassStandardConverter;

public class Collapse {
    public static String collapseInto(double starMassKg) {
        var starMassAtTheMomentOfCollapse = starMassKg * SUN_MASS_KG;
        if (starMassAtTheMomentOfCollapse < SUN_MASS_KG * 8.0) {
            var starWhiteDwarfMass = starWhiteDwarfMass();
            return "Star at the moment of collapse has a mass of " + starMassKgToSolarMassStandardConverter(starMassAtTheMomentOfCollapse) + " M☉, therefore it collapses into " + WHITE_DWARF_STAR.getLabel() + " with potential mass of: " + starWhiteDwarfMass + " kg, or " + String.format("%.1f", starMassKgToSolarMassStandardConverter(starWhiteDwarfMass)) + " M☉";
        }
        if (starMassAtTheMomentOfCollapse >= SUN_MASS_KG * 8.0 && starMassAtTheMomentOfCollapse < SUN_MASS_KG * 25.0) {
            return "Collapses into" + NEUTRON_STAR.getLabel() + " with potential mass of: " + starNeutronMass();
        }
        if (starMassAtTheMomentOfCollapse > SUN_MASS_KG * 25.0) {
            return "Collapses into" + BLACK_HOLE.getLabel() + " with potential mass of: " + starBlackHoleMass();
        }
        return "";
    }
}
