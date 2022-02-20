# 環境構築手順

## Visual Studio Code Remote Containers

1. `Remote-Containers: Add Development Container Configuration Files...`
1. Select `Node.js`
1. Update Dockerfile
   ```
   RUN su node -c "npm install -g @angular/cli@^13.0.0"
   ```
1. Update devcontainer.json
    ```
	"mounts": [
		"source=vscode-angular-13-template-node_modules,target=${containerWorkspaceFolder}/node_modules,type=volume"
	],

	// Use 'postCreateCommand' to run commands after the container is created.
	"postCreateCommand": "sudo chown node node_modules",
    ```
- 参照
    - [Improve disk performance](https://code.visualstudio.com/remote/advancedcontainers/improve-performance)
    - [バインドマウントの利用](https://matsuand.github.io/docs.docker.jp.onthefly/storage/bind-mounts/)

## Create New Angular Project

1. `ng new angular-project-template --directory . --strict`
1. Update extensions.json
    ```
    "recommendations": [
      "angular.ng-template",
      "EditorConfig.EditorConfig"
    ]
    ```
1. Update devcontainer.json
    ```
    "extensions": [
      "angular.ng-template",
      "EditorConfig.EditorConfig"
    ],

    // Use 'postCreateCommand' to run commands after the container is created.
    "postCreateCommand": "sudo chown node node_modules && npm install",
    ```

## ESLint & Prettier 設定

1. `ng add @angular-eslint/schematics`
1. `npm install -D eslint prettier@latest eslint-config-prettier@latest`
1. Update .eslintrc.json
    ```
    "extends": [
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "prettier" // 追加
    ],
    ...
    "extends": [
        "plugin:@angular-eslint/template/recommended",
        "prettier" // 追加
    ],
    ```
1. Update extensions.json
    ```
    "recommendations": [
      "angular.ng-template",
      "dbaeumer.vscode-eslint",
      "EditorConfig.EditorConfig",
      "esbenp.prettier-vscode"
    ]
    ```
1. Update devcontainer.json
    ```
    // Add the IDs of extensions you want installed when the container is created.
    "extensions": [
      "angular.ng-template",
      "dbaeumer.vscode-eslint",
      "EditorConfig.EditorConfig",
      "esbenp.prettier-vscode"
    ],
    ```
1. Create settings.json
    ```
    {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": false,
        "editor.formatOnPaste": false,
        "[typescript]": {
            "editor.formatOnSave": true,
            "editor.codeActionsOnSave": {
                "source.fixAll": true,
                "source.organizeImports": true
            },
        }
    }
    ```
1. Update package.json
    ```
    "scripts": {
        "prettier": "prettier --write \"src/app/**/*.{js,json,css,scss,less,md,ts,html,component.html}\""
    }
    ```
- 参照
    - [angular-starter](https://github.com/wlucha/angular-starter)

## Angular Material 設定

1. `ng add @angular/material`
1. Create MaterialModule
   - `ng g module shared/material`
1. Update app.module.ts
    ```
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MaterialModule, // 追加
    ],
    ```

## CoreModule 設定

1. `ng g module core`
1. Add HttpInterceptor
    - http-logger-interceptor.ts
    - http-error-interceptor.ts
    - index.ts
      ```
      export function provideHttpInterceptors() {
        return [
          { provide: HTTP_INTERCEPTORS, useClass: HttpLoggerInterceptor, multi: true },
          { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
        ];
      }
      ```
1. Update core.module.ts
    ```
    @NgModule({
      declarations: [],
      imports: [HttpClientModule],
      providers: [provideHttpInterceptors()],
    })
    export class CoreModule {
      constructor(@Optional() @SkipSelf() core: CoreModule) {
        if (core) {
          throw new Error('You should import core module only in the root module');
        }
      }
    }
    ```
1. Update app.module.ts
```
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MaterialModule,
      CoreModule, // 追加
    ],
```
