package uk.co.instanto.tearay.rpc.processor;

import javax.lang.model.type.TypeMirror;
import javax.lang.model.util.Types;
import javax.lang.model.util.Elements;

public class TypeUtils {

    public static String getProtoType(String typeName) {
        if ("byte[]".equals(typeName))
            return "bytes";
        switch (typeName) {
            case "String":
            case "java.lang.String":
                return "string";
            case "int":
            case "Integer":
            case "java.lang.Integer":
                return "int32";
            case "long":
            case "Long":
            case "java.lang.Long":
                return "int64";
            case "boolean":
            case "Boolean":
            case "java.lang.Boolean":
                return "bool";
            case "double":
            case "Double":
            case "java.lang.Double":
                return "double";
            case "float":
            case "Float":
            case "java.lang.Float":
                return "float";
            default:
                return null;
        }
    }

    public static String getAdapterType(String typeName) {
        switch (typeName) {
            case "String":
            case "java.lang.String":
                return "ProtoAdapter.STRING";
            case "int":
            case "Integer":
            case "java.lang.Integer":
                return "ProtoAdapter.INT32";
            case "long":
            case "Long":
            case "java.lang.Long":
                return "ProtoAdapter.INT64";
            case "boolean":
            case "Boolean":
            case "java.lang.Boolean":
                return "ProtoAdapter.BOOL";
            case "double":
            case "Double":
            case "java.lang.Double":
                return "ProtoAdapter.DOUBLE";
            case "float":
            case "Float":
            case "java.lang.Float":
                return "ProtoAdapter.FLOAT";
            default:
                return null;
        }
    }

    public static boolean isCollection(String typeName) {
        return (typeName.startsWith("java.util.List") ||
                typeName.startsWith("java.util.Set") ||
                typeName.endsWith("[]")) && !"byte[]".equals(typeName);
    }

    public static boolean isMap(String typeName) {
        return typeName.startsWith("java.util.Map");
    }
}
