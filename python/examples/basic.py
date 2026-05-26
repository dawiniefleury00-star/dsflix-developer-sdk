from dsflix_sdk import DsfClient, DsfError


def main() -> None:
    client = DsfClient(api_key="dfx-your-api-key-here")

    try:
        popular = client.movies.get_popular()
        print("Popular movies:", popular.get("results", [])[:3])

        search = client.search.multi("Inception")
        print("Search results:", search.get("results", [])[:3])

        chat = client.ai.chat("Recommend a good thriller movie")
        print("AI reply:", chat.get("reply"))

    except DsfError as err:
        print(f"DSFlix API error: {err}")


if __name__ == "__main__":
    main()
