package com.dsflix.sdk;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class DsfClient {
    private final HttpClient httpClient;

    public DsfClient(String apiKey) {
        this(apiKey, "https://api.dawensflix.com", 10);
    }

    public DsfClient(String apiKey, String baseUrl, int timeoutSeconds) {
        if (apiKey == null || !apiKey.startsWith("dfx-")) {
            throw new IllegalArgumentException("Invalid apiKey format. Keys must start with 'dfx-'.");
        }
        this.httpClient = new HttpClient(apiKey, baseUrl, timeoutSeconds);
    }

    private String buildQuery(String[][] pairs) {
        StringBuilder builder = new StringBuilder();
        for (String[] pair : pairs) {
            if (pair[1] != null && !pair[1].isEmpty()) {
                if (builder.length() > 0) builder.append("&");
                builder.append(URLEncoder.encode(pair[0], StandardCharsets.UTF_8));
                builder.append("=");
                builder.append(URLEncoder.encode(pair[1], StandardCharsets.UTF_8));
            }
        }
        return builder.toString();
    }

    public String getPopularMovies(String page, String language, String region) throws IOException, InterruptedException {
        return httpClient.get("/api/v2/movies/popular", buildQuery(new String[][]{
            {"page", page},
            {"language", language},
            {"region", region},
        }));
    }

    public String searchMovies(String query, String page, String language) throws IOException, InterruptedException {
        return httpClient.get("/api/v2/search/movie", buildQuery(new String[][]{
            {"query", query},
            {"page", page},
            {"language", language},
        }));
    }

    public String chatAi(String message) throws IOException, InterruptedException {
        String body = String.format("{\"message\":\"%s\"}", message.replace("\"", "\\\""));
        return httpClient.post("/api/v2/ai/chat", body);
    }
}
