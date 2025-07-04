# dd-sdk-reactnative-examples

This repository is a fork of the Datadog repo to show how to instrument a hybrid react native app with native api calls in android, and also api calls wrapped in a webview. The react native app is under `rn-app-with-native`, the website is under`sample-website` while the backend is under `sample-backend`.

## Prerequisites
1. node (tested on v18.20.5) and yarn
2. Android studio (to setup an android device emulator, tested using Android API ver 33-ext5)
3. Java 11 SE
4. Kong deck

## To run the app
1. In `rn-app-with-native`
- Create a `credentials.json` file and add the `applicationId`, `clientToken` and `environment` variable.

```sh
yarn install
yarn run android
```

2. In `sample-backend`, add `DATADOG_API_KEY` into `.env`
```sh
docker compose up --build -d
```

3. In `sample-website`
```sh
yarn install
yarn start
```

4. Sync kong configuration using deck
```sh
deck gateway sync sample-backend/config/kong.yaml
```

## License

For more information, see [Apache License, v2.0](LICENSE)

[1]: https://github.com/DataDog/dd-sdk-reactnative
[2]: https://reactnavigation.org/
