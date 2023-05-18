# 认证与授权

## 认证

验证接口调用方是否已经登录或者认证通过

1. 获取登录的签名消息
2. 在钱包中进行消息签名
3. 验证签名，成功返回 `access_token`
4. 后续访问接口时，Header 中添加 `Authorization: Bearer {{access_token}}`

## 授权

确定接口调用方是否有权限访问或修改特定的资源（接口）

对需要权限访问或修改的资源分别定义好**权限码**，当接口调用方拥有对应**权限码**即可对资源进行访问或修改

1. 在各个 module 中进行权限定义
2. 将权限码授予相应的User或者Role，使之拥有该权限码
3. 访问资源时，通过调用方的　User 或相应 Roles　所对应的权限码进行权限校验


### 基础模块关系
``` mermaid
classDiagram
    CommonModule <|-- AuthModule
    AuthModule <|-- PermissionModule
    PermissionModule <|-- IdentityModule
    AuthModule <|-- IdentityModule
    PrismaModule <|-- IdentityModule
    PrismaModule <|-- InfraModule
    PrismaModule <|-- DotBitModule
    CommonModule <|-- PrismaModule
    PermissionModule <|-- DotBitModule
    class CommonModule{
      IdGenerator
      PageAndSort
      ...
    }
    class AuthModule{
      AuthController
      AuthService
      UserManager
      ...
    }
    class PermissionModule{
      PermissionController
      PermissionsGuard
      PermissionService
      IPermissionDefinitionProvider
      IPermissionCheckProvider
      ...
    }
    class IdentityModule{
      RoleController
      UserController
      ...
    }
    class DotBitModule{
      SubDIDController
      SubDIDService
      ...
    }
    class InfraModule{
      InfraToolController
      InfraToolService
      ...
    }
    class PrismaModule{
      PrismaService
      ...
    }
```
### 禁止匿名
必须登录的用户才可以访问接口，示例如下：

``` ts
import { Auth } from 'src/auth';

export class UserController {

  @Delete(":id")
  @Auth()
  async update(@Param("id") id: string): Promise<void> {
    ....
  }

}

```

***注意，Permission 校验会自动进行匿名检查，不需要额外添加`Auth`装饰器**

### 基于角色的权限
略

### 基于策略的权限

 `permission` 模块中实现了基于policy的权限校验，通过`PermissionsGuard` 来进行相关的权限校验.

 例如，必须具有 `user.delete` 权限的用户才能删除指定的用户, 示例代码如下:

 ``` ts
import { PermissionService, Permissions } from 'src/permission';

export class UserController {

  @Delete(":id")
  @Permissions("user.delete")
  async delete(@Param("id") id: string): Promise<void> {
    ....
  }

}

 ```

 ### 代码中进行权限校验

 有时需要根据相关输入或者数据进行权限校验，使用`PermissionService`中相关方法进行权限判断

 ``` ts
import { Request } from 'express';
import { PermissionService, Permissions } from 'src/permission';

export class UserController {

  @Delete(":id")
  @Permissions("user.delete")
  async update(@Param("id") id: string, @Body() data: UpdateUserInput, @Inject(REQUEST) req: Request): Promise<void> {
    // 获取当前用户（自动从携带的JWT TOKEN中获取）
    const currentUser = getCurrentUser(req);
    if (currentUser.id !== id) {
      // 进行权限`user.update`校验，如果不成功会抛出授权失败异常
      await this.permissionService.checkAsync("user.update", req);
    }
    // 执行用户信息更新代码
    ....
  }

}

 ```

 ## 开发或测试中禁用权限校验

匿名检查或权限校验都是通过 `Guard` 进行实现，为了保证顺序，在 `src/main.ts` 中进行添加的, 注释相关代码即可取消权限校验

``` ts

  app.useGlobalGuards(app.get(JwtAuthGuard));
  app.useGlobalGuards(app.get(PermissionsGuard))
  app.useGlobalGuards(app.get(RolesGuard))

```
