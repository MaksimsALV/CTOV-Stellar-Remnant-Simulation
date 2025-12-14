package data;

public enum Stars {
    STAR("Star"),
    SUN_STAR("Sun"),
    WHITE_DWARF_STAR("White Dwarf"),
    NEUTRON_STAR("Neutron Star"),
    BLACK_HOLE("Black Hole");

    private final String label;
    Stars(String label) {
        this.label = label;
    }
    public String getLabel() {
        return label;
    }
}
