# dd-sdk-reactnative-examples

This repository is a fork of the Datadog repo to show how to instrument a hybrid react native app with native api calls in android, and also api calls wrapped in a webview. The react native app is under `rn-app-with-native`, the website is under`sample-website` while the backend is under `sample-backend`.

## To run the app
1. In `rn-app-with-native`
```sh
yarn install
yarn run android
```

2. In `sample-backend`
```sh
docker compose up
```

3. In `sample-website`
```sh
yarn start
```

## License

For more information, see [Apache License, v2.0](LICENSE)

[1]: https://github.com/DataDog/dd-sdk-reactnative
[2]: https://reactnavigation.org/
