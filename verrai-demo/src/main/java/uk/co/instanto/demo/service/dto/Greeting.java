package uk.co.instanto.demo.service.dto;

import java.util.Map;
import java.util.HashMap;
import uk.co.instanto.tearay.rpc.common.annotation.Portable;

@Portable
public class Greeting {
    private String message;
    private String senderNodeId;
    private Map<String, String> translations = new HashMap<>();
    private Country country;

    public Greeting() {
    }

    public Greeting(String message, String senderNodeId) {
        this.message = message;
        this.senderNodeId = senderNodeId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSenderNodeId() {
        return senderNodeId;
    }

    public void setSenderNodeId(String senderNodeId) {
        this.senderNodeId = senderNodeId;
    }

    public Map<String, String> getTranslations() {
        return translations;
    }

    public void setTranslations(Map<String, String> translations) {
        this.translations = translations;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }
}
