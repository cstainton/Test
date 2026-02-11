package uk.co.instanto.client.service;

import dev.verrai.rpc.common.annotation.Portable;

@Portable
public class RpcPacket {

    public enum Type {
        REQUEST,
        RESPONSE,
        STREAM_DATA,
        STREAM_ERROR,
        STREAM_COMPLETE,
        STREAM_CANCEL,
        EVENT
    }

    private Type type;
    private String serviceId;
    private String methodName;
    private String requestId;
    private String replyTo;
    private byte[] payload;

    // New field for content negotiation
    private String contentType;

    private java.util.Map<String, String> headers;

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public String getServiceId() {
        return serviceId;
    }

    public void setServiceId(String serviceId) {
        this.serviceId = serviceId;
    }

    public String getMethodName() {
        return methodName;
    }

    public void setMethodName(String methodName) {
        this.methodName = methodName;
    }

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    public String getReplyTo() {
        return replyTo;
    }

    public void setReplyTo(String replyTo) {
        this.replyTo = replyTo;
    }

    public byte[] getPayload() {
        return payload;
    }

    public void setPayload(byte[] payload) {
        this.payload = payload;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public java.util.Map<String, String> getHeaders() {
        return headers;
    }

    public void setHeaders(java.util.Map<String, String> headers) {
        this.headers = headers;
    }
}
