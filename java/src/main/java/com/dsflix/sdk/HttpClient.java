package com.dsflix.sdk;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class HttpClient {
    private final java.net.http.HttpClient client;
    private final String apiKey;
    private final String baseUrl;
    private final int timeoutSeconds;

    public HttpClient(String apiKey, String baseUrl, int timeoutSeconds) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl.endsWith("/") ? baseUrl.substring(0, baseUrl.length() - 1) : baseUrl;
        this.timeoutSeconds = timeoutSeconds;
        this.client = java.net.http.HttpClient.newBuilder().build();
    }

    public String get(String path, String query) throws IOException, InterruptedException {
        // Offline mock mode: set DSFLIX_MOCK=1 to return canned responses
        if ("1".equals(System.getenv("DSFLIX_MOCK"))) {
            if (path.startsWith("/api/v2/movies/popular")) {
                return "{\"page\":1,\"results\":[{\"id\":1,\"title\":\"Mock Movie\",\"overview\":\"A mock movie.\"}],\"total_pages\":1,\"total_results\":1}";
            }
            if (path.startsWith("/api/v2/search/multi") || path.startsWith("/api/v2/search/movie")) {
                return "{\"page\":1,\"results\":[{\"id\":42,\"media_type\":\"movie\",\"title\":\"Mock Search\",\"overview\":\"Mocked search result.\"}],\"total_pages\":1,\"total_results\":1}";
            }
            if (path.startsWith("/api/v2/ai/chat")) {
                return "{\"id\":\"mock-1\",\"reply\":\"This is a mocked AI reply.\"}";
            }
        }
        String url = baseUrl + path + (query.isEmpty() ? "" : "?" + query);
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .timeout(java.time.Duration.ofSeconds(timeoutSeconds))
            .header("Authorization", "Bearer " + apiKey)
            .header("Accept", "application/json")
            .GET()
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() >= 400) {
            throw new IOException("HTTP " + response.statusCode() + ": " + response.body());
        }
        return response.body();
    }

    public String post(String path, String jsonBody) throws IOException, InterruptedException {
        // Offline mock mode for POST requests
        if ("1".equals(System.getenv("DSFLIX_MOCK"))) {
            if (path.startsWith("/api/v2/ai/chat")) {
                return "{\"id\":\"mock-1\",\"reply\":\"This is a mocked AI reply.\"}";
            }
        }

        String url = baseUrl + path;
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .timeout(java.time.Duration.ofSeconds(timeoutSeconds))
            .header("Authorization", "Bearer " + apiKey)
            .header("Accept", "application/json")
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() >= 400) {
            throw new IOException("HTTP " + response.statusCode() + ": " + response.body());
        }
        return response.body();
    }
}
