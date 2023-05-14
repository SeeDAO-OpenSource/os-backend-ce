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


基础模块关系
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