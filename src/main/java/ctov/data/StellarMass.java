package ctov.data;

public class StellarMass {
    public double whiteDwarfSolarMass() {
        return generateSolarMass(0.15, 1.4);
    }

    public double neutronStarSolarMass() {
        return generateSolarMass(1.4, 2.2);
    }

    public double blackHoleSolarMass() {
        return generateSolarMass(2.2, 50.0);
    }

    private double generateSolarMass(double min, double max) {
        return min + (max - min) * Math.random();
    }
}
