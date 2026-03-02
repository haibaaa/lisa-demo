
# Lisa Demo

This repository shows a **minimal setup** for using **Lisa** with a client application.

The demo consists of:
- a **React (Vite) app** that reads remote configuration
- a **local config file** that controls the app at runtime by leveraging mona

---

## Files to Look At

### `lisa-demo/src/App.tsx`
- Fetches config from Lisa’s public API
- Applies `theme` to page background
- Toggles UI using feature flags
- Polls periodically for updates

### `lisa-demo-conf/lisa.toml`
- Defines runtime configuration values
- Synced to Lisa by the operator
- Changes here update the app without redeploying

---

## Setup

### 1. Create a Lisa project

With the Lisa backend running locally:

```bash
curl -X POST https://lisa-aopa.onrender.com/create/<project_name>
````
> [!CAUTION] Response (shown once):

```json
{
  "client_api": "public-client-key",
  "config_api": "private-config-key"
}
```

### 2. Configure the lisa-demo-conf/.env
install uv and run
```bash
uv sync
```

Set these in `lisa-demo/.env`:

```env
LISA_CONFIG_API=config_api
```
---

### 2. Configure the React app

Set these in `lisa-demo/.env`:

```env
VITE_LISA_CLIENT_API=client-api
```

---

### 3. Configure sync

Use the private `config_api` key to sync values from:

```
lisa-demo-conf/lisa.toml
```

---

## Demo Flow

> [!NOTE] You may experience some initial delays because of Render

1. Start the React app
2. Update values in `lisa.toml`
3. Sync configuration to Lisa
4. Watch the UI update without redeploying
