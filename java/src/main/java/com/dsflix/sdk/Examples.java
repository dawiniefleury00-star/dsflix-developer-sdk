package com.dsflix.sdk;

public class Examples {
    public static void main(String[] args) {
        try {
            DsfClient client = new DsfClient("dfx-your-api-key-here");
            String response = client.getPopularMovies(null, "en-US", null);
            System.out.println("Popular movies response: " + response);

            String search = client.searchMovies("Inception", null, "en-US");
            System.out.println("Search response: " + search);

            String chat = client.chatAi("Recommend a good thriller movie");
            System.out.println("AI response: " + chat);
        } catch (Exception error) {
            error.printStackTrace();
        }
    }
}
