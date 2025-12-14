package tools;

import static data.StellarMass.SUN_MASS_KG;

public class Converter {
    public static double starMassKgToSolarMassStandardConverter(double starMassKg) {
        return starMassKg / SUN_MASS_KG;
    }
}
