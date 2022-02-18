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
