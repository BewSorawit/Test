package com.example.probone.model;

public class CloudVendor {
    private String id;
    private String name;
    private String description;

    // Default constructor
    public CloudVendor() {
    }

    // Parameterized constructor
    public CloudVendor(String id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    // Getter methods
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    // Setter methods (if needed)
    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
