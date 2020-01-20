## Install development tools
Informtion extracted from [this guide](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/).

* Optionally install web-ext for ease of signing, debuggin and packaging the extension.
```bash
sudo yarn add global web-ext
```

## Upload new version
1. Increment the version in 
2. Package the contents
  ```bash
  # without web-ext
  zip -r -FS ../my-extension.zip *
  ```
  ```bash
  # with web-ext
  web-ext build
  ```
3. [Get credentials](https://addons.mozilla.org/developers/addon/api/key/) and sign the package.
  ```bash
  web-ext sign --api-key=$AMO_JWT_ISSUER --api-secret=$AMO_JWT_SECRET
  ```
4. Go to Manage Subscriptions: https://addons.mozilla.org/en-US/developers/addons
5. Click on extension, then click `Upload New Version`
6. Select the package file, write release notes, and submit
