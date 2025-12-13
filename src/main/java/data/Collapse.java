package data;

import static data.StellarMass.*;

public class Collapse {
    public static String collapseInto(double starMass) {
        var result = starMass * SUN_MASS_KG;
        if (result < SUN_MASS_KG * 8.0) {
            return "Collapses into White Dwarf with potential mass of: " + starWhiteDwarfMass();
        }
        if (result >= SUN_MASS_KG * 8.0 && result < SUN_MASS_KG * 25.0) {
            return "Collapses into Neutron Star with potential mass of: " + starNeutronMass();
        }
        return "";
    }

//    //todo
//    public static boolean collapseIntoBlackHole(double STAR_MASS) {
//        return STAR_MASS > SUN_MASS_KG * 25;
//    }
}
