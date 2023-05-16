
## DB层ORM选择

### prisma

#### prisma在项目中的使用
1. 安装 Prisma ：
```sh
npm install prisma --save-dev 
```
2. 初始化 Prisma
```
npx prisma init
# 使用mongodb
# npx prisma init --datasource-provider mongodb
```
这将在项目根目录下创建一个名为 prisma 的文件夹，其中包含 schema.prisma 文件。

3. 配置 prisma/schema.prisma 文件以连接到您的数据库。
3.1 以下是一个使用 PostgreSQL 的示例：
```
datasource db {
  provider = "postgresql"
  url      = "postgresql://username:password@localhost:5432/mydatabase"
}

generator client {
  provider = "prisma-client-js"
}
```
3.2 以下是一个使用 SQLite 的示例：
```
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

3.3 以下是一个使用 MongoDB 的示例：
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
generator client {
  provider = "prisma-client-js"
}

```
4. 在 prisma/schema.prisma 文件中定义 Item 模型：
```sh
model Item {
  id          Int     @id @default(autoincrement())
  name        String
  description String
}

```

5. 运行以下命令生成 Prisma 客户端并应用模型更改到数据库：

```
npx prisma generate
npx prisma db push
```

6. .env文件中的配置
```
# DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
DATABASE_URL=file:./db.sqlite
```

7. schema.prisma文件拆分
目前没有找到prisma支持拆分schema.prisma文件的方法，所以我们需要自己手动拆分，拆分后的文件名为schema.prisma.part.prisma，然后在schema.prisma中引入

注意事项：
由于项目数据结构太大，为了容易管理，我们将数据结构分成了多个文件，然后在schema.prisma中引入，使用到的命令如下：
```
# Linux 
cat *.part.prisma > schema.prisma

# Windows
Get-Content *.part.prisma | Set-Content schema.prisma

```

### typeorm
引用了但没有作为选择


## DB数据库选择


### flurdb[web3数据库]
https://www.npmjs.com/package/@fluree/crypto-utils
https://www.npmjs.com/package/@fluree/flureedb

### supabase

参考资料：https://supabase.com/docs/guides/integrations/prisma

1. 在.env中增加配置
```
DATABASE_URL="postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

```
2. 进行迁移
```
npx prisma migrate dev --name init
```
