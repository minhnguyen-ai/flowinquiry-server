package io.flexwork;

import io.flexwork.db.TenantContext;
import org.junit.jupiter.api.extension.BeforeEachCallback;
import org.junit.jupiter.api.extension.ExtensionContext;

public class DefaultTenantContextBeforeEachCallback implements BeforeEachCallback {

    @Override
    public void beforeEach(ExtensionContext context) throws Exception {

        // Access annotation value if needed
        DefaultTenantContext defaultTenantContextAnnotation =
                context.getRequiredTestClass().getAnnotation(DefaultTenantContext.class);
        if (defaultTenantContextAnnotation != null) {
            TenantContext.setCurrentTenant(defaultTenantContextAnnotation.value());
        }
    }
}
