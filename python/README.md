# DSFlix SDK for Python

A Python client for the DSFlix streaming API, modeled after the existing TypeScript SDK.

## Install

```bash
pip install -e .
```

## Quick start

```python
from dsflix_sdk import DsfClient

client = DsfClient(api_key="dfx-your-api-key")
movies = client.movies.get_popular()
print(movies.get("results", []))

search = client.search.multi("Inception")
print(search.get("results", []))

reply = client.ai.chat("Recommend a good thriller movie")
print(reply.get("reply"))
```

## Package structure

- `dsflix_sdk.client`: main client class
- `dsflix_sdk.http`: network layer using `requests`
- `dsflix_sdk.exceptions`: SDK exception types
- `dsflix_sdk.modules`: endpoint modules for movies, tv, search, ai, user, coins, membership, music, news, home

## Example

See `examples/basic.py` for a runnable sample.
