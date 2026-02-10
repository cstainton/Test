package uk.co.instanto.demo.service.dto;

import uk.co.instanto.tearay.rpc.common.annotation.Portable;

@Portable

public class Country {
    private String name;
    private String isoCode;

    public Country() {
    }

    public Country(String name, String isoCode) {
        this.name = name;
        this.isoCode = isoCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIsoCode() {
        return isoCode;
    }

    public void setIsoCode(String isoCode) {
        this.isoCode = isoCode;
    }

    @Override
    public String toString() {
        return "Country{name='" + name + "', isoCode='" + isoCode + "'}";
    }
}
