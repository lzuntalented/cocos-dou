# cocos-dou
一个使用cocos2d-js引擎编写的斗地主游戏

###背景
>这个项目是一年前完成的，记得当时很想做游戏开发，便奋战了好多个夜晚，促成了这个投石demo,奈何最终还是未入游戏领域，甚是遗憾。最近整理磁盘，翻看了下，觉得可以分享给各位看官一睹。

###项目描述
>这是个跟欢乐斗地主一样规则的游戏。有三个角色，一个玩家可操控，另两个是机器人。
```
完成的功能:
1.单机斗地主基本功能（发牌、分派地主、牌型比较、出牌顺序与规则管理）
2.机器人出牌规则 （由于对AI不熟悉，只是简单的比较手中牌型是否有大于上家的，若有则出牌。）
```

###项目地址
>github地址：[https://github.com/lzuntalented/cocos-dou](https://github.com/lzuntalented/cocos-dou)
演示地址：[http://www.lzuntalented.cn/game/dou/](http://www.lzuntalented.cn/game/dou/)
![运行截图](http://www.lzuntalented.cn/game/dou/res/dou1.png)

###源码结构
```
frameworks    ------------- cocos2d-js引擎 我使用的是v3.6.1,理论支持其他3.x版本。由于文件过大，并未上传git，请自行下载
publish ------------- 编译后的文件，将html5放在服务器中，访问index.html即可体验
src     |------------- 项目源码
        |AIRole.js ------------- 模拟AI的机器人角色
        |app.js ------------- 主入口
        |CardManager.js ------------- 游戏流程控制
        |CardSprite.js -------------- 每张牌的表示对象
        |PublicData.js -------------- 牌面生成及公共变量
        |resource.js -------------- 资源目录
        |Role.js ------------- 玩家角色
        |Tooler.js ------------- 牌型枚举，牌型判断，牌型比较
index.html ------------- 调试主入口
main.js ------------- 调试运行主文件
project.json ------------- 配置文件
```
###总结
>一个项目的开始，首先要理清思绪，明确程序流程，设计好数据结构，做起来会更清晰与省事。(PS:做游戏蛮好玩的，做出来之后的成就感也是蛮舒畅的)
