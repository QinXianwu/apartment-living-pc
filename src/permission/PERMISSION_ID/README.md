# 权限 ID 表

全局使用

按照模块区分，例如`Client.js`代表会员模块相关的权限 ID

权限 ID 统一使用 `export default {}`导出，并且命名规则以`_`区分等级，例如：

`会员管理` 是一级菜单，则命名为：`Client`

`会员列表` 是位于`会员管理`下的二级菜单，则命名为：`Client_ClientList`

`新增客户`按钮，是位于`会员列表`内的按钮，，则命名为：`Client_ClientList_CreateClient`

详细可以查询`Client.js`文件
