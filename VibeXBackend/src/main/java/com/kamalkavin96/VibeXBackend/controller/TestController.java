package com.kamalkavin96.VibeXBackend.controller;

import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.Tracer;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Enumeration;

@RestController
public class TestController {

    private final Tracer tracer;

    public TestController(Tracer tracer) {
        this.tracer = tracer;
    }

    @GetMapping("/test")
    public String test(HttpServletRequest request,
                       HttpServletResponse response) {

        Span span = tracer.spanBuilder("HTTP GET /test").startSpan();

        try {
            /* ================= REQUEST INFO ================= */

            span.setAttribute("http.method", request.getMethod());
            span.setAttribute("http.scheme", request.getScheme());
            span.setAttribute("http.host", request.getServerName());
            span.setAttribute("http.port", request.getServerPort());
            span.setAttribute("http.path", request.getRequestURI());
            span.setAttribute("http.query", request.getQueryString());
            span.setAttribute("http.client_ip", request.getRemoteAddr());
            span.setAttribute("http.user_agent", request.getHeader("User-Agent"));
            span.setAttribute("http.content_type", request.getContentType());

            // Capture request headers
            Enumeration<String> headerNames = request.getHeaderNames();
            if (headerNames != null) {
                for (String header : Collections.list(headerNames)) {
                    span.setAttribute(
                            "http.request.header." + header.toLowerCase(),
                            request.getHeader(header)
                    );
                }
            }

            span.addEvent("Request received");

            /* ================= BUSINESS LOGIC ================= */

            Thread.sleep(200); // simulate work

            String responseBody = "Sent to Jaeger!";

            /* ================= RESPONSE INFO ================= */

            response.setStatus(HttpServletResponse.SC_OK);

            span.setAttribute("http.status_code", response.getStatus());
            span.setAttribute("http.response.body", responseBody);
            span.addEvent("Response sent");

            return responseBody;

        } catch (Exception e) {
            span.recordException(e);
            span.setAttribute("error", true);
            throw new RuntimeException(e);
        } finally {
            span.end();
        }
    }
}
