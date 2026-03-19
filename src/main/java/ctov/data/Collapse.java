package ctov.data;

public class Collapse {
    private final StellarMass stellarMass = new StellarMass();

    public String collapse(double solarMass) {
        if (solarMass < Constants.CHANDRASEKHAR_LIMIT_SOLAR) {
            return collapseMessage(solarMass, RemnantType.WHITE_DWARF, stellarMass.whiteDwarfSolarMass());
        }

        if (solarMass < Constants.TOV_LIMIT_SOLAR) {
            return collapseMessage(solarMass, RemnantType.NEUTRON_STAR, stellarMass.neutronStarSolarMass());
        }

        return collapseMessage(solarMass, RemnantType.BLACK_HOLE, stellarMass.blackHoleSolarMass());
    }

    //helper
    private String collapseMessage(double solarMass, RemnantType remnantType, double remnantMass) {
        return "Star at the moment of collapse has a mass of "
                + String.format("%.2f", solarMass)
                + " M☉, therefore it collapses into "
                + remnantType.getRemnantType()
                + " with mass "
                + String.format("%.2f", remnantMass)
                + " M☉";
    }
}
