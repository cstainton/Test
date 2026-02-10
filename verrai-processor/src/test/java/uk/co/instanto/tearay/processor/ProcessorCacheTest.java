package uk.co.instanto.tearay.processor;

import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;

import javax.annotation.processing.Filer;
import javax.annotation.processing.Messager;
import javax.annotation.processing.ProcessingEnvironment;
import javax.tools.FileObject;
import javax.tools.StandardLocation;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Properties;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

public class ProcessorCacheTest {

    private ProcessingEnvironment processingEnv;
    private Filer filer;
    private Messager messager;
    private ProcessorCache cache;

    @Before
    public void setUp() {
        processingEnv = mock(ProcessingEnvironment.class);
        filer = mock(Filer.class);
        messager = mock(Messager.class);

        when(processingEnv.getFiler()).thenReturn(filer);
        when(processingEnv.getMessager()).thenReturn(messager);

        cache = new ProcessorCache(processingEnv);
    }

    @Test
    public void testFirstRun_NoCacheFile() throws IOException {
        // Simulate no cache file
        when(filer.getResource(any(), any(), any())).thenThrow(new IOException("File not found"));

        assertTrue(cache.isChanged("com.example.Bean", "sig1"));
    }

    @Test
    public void testSecondRun_Unchanged() throws IOException {
        // Prepare cache content
        Properties props = new Properties();
        props.setProperty("com.example.Bean", "sig1");
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        props.store(out, null);
        ByteArrayInputStream in = new ByteArrayInputStream(out.toByteArray());

        FileObject fileObject = mock(FileObject.class);
        when(fileObject.openInputStream()).thenReturn(in);
        when(filer.getResource(StandardLocation.CLASS_OUTPUT, "", "META-INF/tearay-processor-cache.properties")).thenReturn(fileObject);

        assertFalse(cache.isChanged("com.example.Bean", "sig1"));
    }

    @Test
    public void testSecondRun_Changed() throws IOException {
        // Prepare cache content
        Properties props = new Properties();
        props.setProperty("com.example.Bean", "sig1");
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        props.store(out, null);
        ByteArrayInputStream in = new ByteArrayInputStream(out.toByteArray());

        FileObject fileObject = mock(FileObject.class);
        when(fileObject.openInputStream()).thenReturn(in);
        when(filer.getResource(StandardLocation.CLASS_OUTPUT, "", "META-INF/tearay-processor-cache.properties")).thenReturn(fileObject);

        assertTrue(cache.isChanged("com.example.Bean", "sig2"));
    }

    @Test
    public void testSave() throws IOException {
        FileObject fileObject = mock(FileObject.class);
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        when(fileObject.openOutputStream()).thenReturn(out);
        when(filer.createResource(any(), any(), any(), any())).thenReturn(fileObject);

        cache.update("com.example.Bean", "sig1");
        cache.save();

        String content = out.toString();
        assertTrue(content.contains("com.example.Bean=sig1"));
    }

    @Test
    public void testDisabled() throws IOException {
        // Setup cache to return "sig1" (unchanged)
        Properties props = new Properties();
        props.setProperty("com.example.Bean", "sig1");
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        props.store(out, null);
        ByteArrayInputStream in = new ByteArrayInputStream(out.toByteArray());

        FileObject fileObject = mock(FileObject.class);
        when(fileObject.openInputStream()).thenReturn(in);
        when(filer.getResource(any(), any(), any())).thenReturn(fileObject);

        System.setProperty("tearay.cache.disabled", "true");
        try {
            // Even though cache has sig1, we expect isChanged=true because disabled
            assertTrue(cache.isChanged("com.example.Bean", "sig1"));
        } finally {
            System.clearProperty("tearay.cache.disabled");
        }
    }
}
