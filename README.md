# upset gal mirror

Use solid.js with no any else components.

This project is a front end of mirror of [upset gal](https://shinnku.com/).

## Main features

Use _Koibumi design system_ (by haruki, still in process).

Use solid.js as main framework.

Responsive Layout with mobile adaptation.

The first stable version is completed within 1 day.

All svg icons are designed by myself.

## For collaborator

### How to run

```bash
pnpm install 
pnpm run dev
```

If you want to use your server, you can change the `types/constant.ts` file.

### How to build

```bash
pnpm run build
```

### Reverse proxy Server

You can use `nginx` or `caddy` to reverse proxy the server.

The `caddy` config file is in `Caddyfile`. There is an example:

```caddyfile
shinnku.plr.moe {
    encode gzip
    
    handle /mirror/api/* {
        uri replace /mirror/api /api/download/legacy
        reverse_proxy https://shinnku.com {
            header_up Host {upstream_hostport}
        }
    }

    handle {
        root * /usr/share/caddy/upset-gal-mirror/dist

        @notSpaRoute {
            path /robots.txt /mirror/api/*
        }
        @staticFiles {
            path /assets/*.* /index.html /favicon.ico
        }
        rewrite @notSpaRoute {http.matchers.path}
        
        header @staticFiles Cache-Control "public, max-age=604800, immutable"

        try_files {path} /index.html

        file_server
    }
}

```