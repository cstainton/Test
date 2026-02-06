package uk.co.instanto.tearay.testapp;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.teavm.junit.SkipJVM;
import org.teavm.junit.TeaVMTestRunner;
import uk.co.instanto.tearay.material.MaterialButton;
import uk.co.instanto.tearay.material.MaterialCheckbox;
import uk.co.instanto.tearay.material.MaterialSwitch;
import uk.co.instanto.tearay.material.MaterialTextField;
import static org.junit.Assert.*;

@RunWith(TeaVMTestRunner.class)
@SkipJVM
public class MaterialWidgetTest {

    @Test
    public void testMaterialWidgets() {
        MaterialButton btn = new MaterialButton();
        assertEquals("MD-FILLED-BUTTON", btn.element.getTagName());
        btn.setLabel("Test");
        assertEquals("Test", btn.element.getInnerText());

        MaterialTextField txt = new MaterialTextField();
        assertEquals("MD-OUTLINED-TEXT-FIELD", txt.element.getTagName());
        txt.setLabel("Name");
        assertEquals("Name", txt.element.getAttribute("label"));
        txt.setValue("Value");
        assertEquals("Value", txt.getValue());

        MaterialCheckbox chk = new MaterialCheckbox();
        assertEquals("MD-CHECKBOX", chk.element.getTagName());
        chk.setChecked(true);
        assertTrue(chk.isChecked());
        assertTrue(chk.element.hasAttribute("checked"));

        MaterialSwitch sw = new MaterialSwitch();
        assertEquals("MD-SWITCH", sw.element.getTagName());
        sw.setSelected(true);
        assertTrue(sw.isSelected());
    }
}
