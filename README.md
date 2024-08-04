### github仓库地址: https://github.com/Vinnie125/interestcy/tree/master

接下来将对软件功能的实现进行逐一介绍

1. 多用户登录：即前端login和register界面，用户可以选择是否已有账户。没有账户可以注册。后端使用user.json储存账户信息，定义User实体、UserController、UserService，从而实现用户信息的读取和写入。
   

2. 兴趣圈创建：对应CreateGroup界面。后端采用cycle.json进行储存，包括id、name、description、location、members，定义InterestGroup实体、InterestGroupController、InterestGroupService，从而实现兴趣圈信息的读取和写入。
   

3. 兴趣圈发帖：对应CreatePost界面，后端使用post.json进行存储，包括id、name、content、url，定义相关实体、Controller、Service文件进行写入。
   

4. 帖子查看：在兴趣圈创建时有相应id，进入该兴趣圈页面时读取页面id并读取cycle.json中对应id的post.json，进行显示。
   

5. 帖子评论：创建comment.json进行存储，由于创建兴趣圈和发帖时均有id，因此点击评论按钮时会自动对应到相应的/:groupId/:postId，从而进行存储。当读取时用当前帖子的groupId和postId与comment.json中内容相比较，从而显示该位置的评论。
   

6. 展示兴趣圈成员活跃情况：这里我采取成员发帖数量进行衡量。每当成员发帖时会有相应用户名输入，在展示活跃情况界面，读取post.json并比较发帖的成员用户名，从而获得成员发帖数量，即活跃情况，并进行显示。
   
   
7. 发帖可添加图片：在发帖界面有图片选项，可以写入图片的链接，即可在帖子中添加图片。