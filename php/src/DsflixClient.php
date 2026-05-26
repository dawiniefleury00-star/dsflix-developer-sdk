<?php

namespace DsflixSdk;

class DsflixClient
{
    private string $apiKey;
    private string $baseUrl;
    private int $timeout;

    public function __construct(string $apiKey, string $baseUrl = 'https://api.dawensflix.com', int $timeout = 10)
    {
        $this->apiKey = $apiKey;
        $this->baseUrl = rtrim($baseUrl, '/');
        $this->timeout = $timeout;
    }

    private function request(string $method, string $path, array $params = [], array $body = []): array
    {
        $url = $this->baseUrl . $path;
        if (!empty($params)) {
            $url .= '?' . http_build_query(array_filter($params, fn($value) => $value !== null));
        }

        $headers = [
            'Authorization: Bearer ' . $this->apiKey,
            'Accept: application/json',
        ];

        if (!empty($body)) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
            $headers[] = 'Content-Type: application/json';
        }

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_TIMEOUT, $this->timeout);

        $result = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);

        if ($result === false) {
            throw new \RuntimeException('HTTP request failed: ' . $error);
        }

        $payload = json_decode($result, true);
        if ($status >= 400) {
            $message = $payload['error'] ?? $payload['message'] ?? 'Request failed';
            throw new \RuntimeException("DSFlix API error ({$status}): {$message}");
        }

        return $payload ?? [];
    }

    public function getPopularMovies(int $page = null, string $language = null, string $region = null): array
    {
        return $this->request('GET', '/api/v2/movies/popular', compact('page', 'language', 'region'));
    }

    public function searchMovies(string $query, int $page = null, string $language = null): array
    {
        return $this->request('GET', '/api/v2/search/movie', compact('query', 'page', 'language'));
    }

    public function chatAi(string $message, array $context = []): array
    {
        return $this->request('POST', '/api/v2/ai/chat', [], ['message' => $message, 'context' => $context]);
    }
}
