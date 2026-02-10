package dev.verrai.sample;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.teavm.junit.SkipJVM;
import org.teavm.junit.TeaVMTestRunner;
import org.teavm.jso.dom.html.HTMLElement;
import static org.junit.Assert.*;

@RunWith(TeaVMTestRunner.class)
@SkipJVM
public class UserCardTest {

    @Test
    public void testUserCardBinding() {
        UserCard card = new UserCard();

        // Bind the template to the component
        HTMLElement root = UserCard_Binder.bind(card);
        // Manually call init since we are bypassing the IOC container
        card.init();

        assertNotNull("Root element should not be null", root);
        assertNotNull("nameSpan should be bound", card.nameSpan);
        assertNotNull("actionButton should be bound", card.actionButton);

        // Verify initial state
        assertEquals("Unknown", card.nameSpan.getInnerText());

        // Test method
        card.setName("Test User");
        assertEquals("Test User", card.nameSpan.getInnerText());

        // Test Event
        card.actionButton.click();
        assertEquals("Clicked!", card.nameSpan.getInnerText());
    }
}
