package dev.verrai.sample;

import dev.verrai.api.DataField;
import dev.verrai.api.Page;
import dev.verrai.api.Templated;
import dev.verrai.api.PostConstruct;
import dev.verrai.ui.Composite;
import javax.inject.Inject;

@Page(path = "composite")
@Templated
public class CompositeDemoPage extends Composite {

    @Inject
    @DataField
    public UserCard userCard1;

    @Inject
    @DataField
    public UserCard userCard2;

    @PostConstruct
    public void init() {
        if (userCard1 != null) {
            userCard1.setName("Alice");
        }
        if (userCard2 != null) {
            userCard2.setName("Bob");
        }
    }
}
