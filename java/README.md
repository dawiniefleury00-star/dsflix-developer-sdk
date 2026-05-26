# DSFlix SDK for Java

A Java client wrapper for the DSFlix streaming API.

## Build

```bash
cd java
mvn package
```

## Example

```bash
cd java
mvn exec:java -Dexec.mainClass="com.dsflix.sdk.Examples"
```

## Usage

Use `DsfClient` to call API endpoints from Java:

```java
DsfClient client = new DsfClient("dfx-your-api-key");
String popular = client.getPopularMovies(null, "en-US", null);
System.out.println(popular);
```
