package uk.co.instanto.common.codec;

import com.squareup.wire.Message;
import com.squareup.wire.ProtoAdapter;

public interface Codec<POJO, WIRE extends Message<WIRE, ?>> {
    WIRE toWire(POJO pojo);

    POJO fromWire(WIRE wire);

    ProtoAdapter<WIRE> getWireAdapter();
}
