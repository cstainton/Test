package uk.co.instanto.demo.service.dto;

import uk.co.instanto.tearay.rpc.common.annotation.Portable;

@Portable

public class MyData {
    private String id;
    private String content;
    private int value;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}
