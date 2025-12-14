package data;


public final class StellarMass {
        public static final double SUN_MASS_KG = 1.98847e30;

        public static double starWhiteDwarfMass() {
            var minimumMass = 0.15 * SUN_MASS_KG;
            var maximumMass = 0.4 * SUN_MASS_KG;
            return minimumMass + (maximumMass - minimumMass) * Math.random();
        }

        public static double starNeutronMass() {
            var minimumMass = 1.4 * SUN_MASS_KG;
            var maximumMass = 2 * SUN_MASS_KG;
            return minimumMass + (maximumMass - minimumMass) * Math.random();
        }

        public static double starBlackHoleMass() {
            var minimumMass = 3.0 * SUN_MASS_KG;
            var maximumMass = 50.0 * SUN_MASS_KG;
            return minimumMass + (maximumMass - minimumMass) * Math.random();
        }
}
