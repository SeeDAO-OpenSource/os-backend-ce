# 部署

## 使用Github Action部署到fly.io

GitHub Actions 是一个非常棒的 CI/CD 工具,可以很好地配合 fly.io 进行自动部署。

具体步骤如下：
1. 在 fly.io 上创建账号后，在Account->Access Tokens中创建API Token
2. 在本地项目中创建fly.toml文件，内容如下：
        ```toml
        # fly.toml file generated for os-backend-ce on 2023-05-12T19:13:27+08:00

        app = "os-backend-ce"
        kill_signal = "SIGINT"
        kill_timeout = 5
        mounts = []
        primary_region = "nrt"
        processes = []

        [[services]]
        internal_port = 3000
        processes = ["app"]
        protocol = "tcp"
        [services.concurrency]
            hard_limit = 25
            soft_limit = 20
            type = "connections"

        [[services.ports]]
            force_https = true
            handlers = ["http"]
            port = 80

        [[services.ports]]
            handlers = ["tls", "http"]
            port = 443
        ```
    这一步的fly.toml文件也可以使用以下命令生成:
    ```bash
    flyctl auth login
    flyctl init
    ```
3. 在本地项目中创建.github/workflows/fly.yml文件，内容如下：
        ```yml
        name: Fly Deploy
        on:
        push:
            branches:
            - dev
        env:
        DATABASE_URL: ${{ secrets.DATABASE_URL }}
        DOTBIT_SeeDAO_PRIVATE_KEY: ${{ secrets.DOTBIT_SeeDAO_PRIVATE_KEY }}
        JWT_SECRET: ${{ secrets.JWT_SECRET }}
        JWT_EXPIRES_IN: ${{ secrets.JWT_EXPIRES_IN }}

        jobs:
        deploy:
            name: Deploy app
            runs-on: ubuntu-latest
            steps:
            - uses: actions/checkout@v3
            - uses: superfly/flyctl-actions/setup-flyctl@master
            - run: flyctl deploy --remote-only
                env:
                FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
        ```
    其中的变量需要在项目的setting中进行设置, 并且该配置是针对dev分支的, 如果需要针对master分支, 则需要在on中进行修改
4. 在Github项目的Settings->Secrets中创建FLY_API_TOKEN，值为第1步当中的fly.io的API Token
5. 在Github项目的Settings->Environment中创建上面的环境配置,如DATABASE_URL，值为数据库的连接字符串,如下图[!image](./images/github-setting-env.png)所示
6. 这样就完成了，每次提交代码到dev分支都会触发fly.io部署，部署成功后会自动更新fly.io的应用程序