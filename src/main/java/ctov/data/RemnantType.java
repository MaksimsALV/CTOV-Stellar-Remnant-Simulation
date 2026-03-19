package ctov.data;

public enum RemnantType {
    WHITE_DWARF("White Dwarf"),
    NEUTRON_STAR("Neutron Star"),
    BLACK_HOLE("Black Hole");

    private final String remnantType;

    RemnantType(String remnantType) {
        this.remnantType = remnantType;
    }
    public String getRemnantType() {
        return remnantType;
    }
}
