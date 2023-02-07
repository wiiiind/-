# 说明：
本项目调用了(https://binaryify.github.io/NeteaseCloudMusicApi/#/ "网易云音乐 NodeJS 版 API")，使用前要在本地部署并采用默认端口3000启动。

# 实现的功能

## index页面
### banner
* 自动轮播banner图
* 左右切换控制按钮
* 点击banner跳转对应页面（非单曲的banner图会跳出本文件）
* 鼠标放到banner图自动暂停轮播
### 热门推荐
* 实时更新的推荐专辑
* 点击可跳转对应专辑（跳出本文件）
### 新碟上架
* 只有样子，没有更新
* 左右切换控制按钮
### 快速跳转
* 输入歌曲ID快速跳转至播放页
### 音量控制
* 不会做

## 歌单广场
* 没来得及做

## 搜索
### 热搜榜
* 实时更新的热搜榜，含热搜指数、热搜推荐词等
* 鼠标放上去有被选中的动画
* 点击可以快速搜索
### 搜索功能
* 输入后按回车不可以搜索，一定要按搜索按钮才行（没来得及做）
* 搜做中文内容时，虽然搜索词会变成乱码，但还是能搜出来
* 歌曲信息一览无余
* 点击歌名就能播放
* 点击歌手、专辑都能快速跳转（跳出本文件）

## 播放页
* 歌曲信息一览无余
* 点击歌手、专辑都能快速跳转（跳出本文件）
* 可以展开收起的歌词
* VIP歌曲试听30秒
* 可以控制音量进度甚至还能下载歌曲的高级进度条（调用浏览器自带样式）
* 展示5条精选评论
* 假装登录就能发评论听VIP歌曲但是我压根没做登录功能

# 想说的话 ***要看完！***
其实我是一个非常懒的人，这个项目对我来说是一个珍贵十足的机会。上学期，自从加入战队之后，我就一次课都没听过了（学了进阶css，JavaScript一点没学）。寒假也是快到报名截止日期才匆匆报名，由于怕拖累别人，也没报双人项目。
你以为报了名之后我就勤奋起来了吗？并没有！从我报名那一天到1月24日，我甚至连vscode都没有打开过。1月24日我从老家回家，当天晚上才开始构思这个项目。这时，离截止日期只剩两周（总共给了五周时间）了。本来我的构思是要做5个页面的（见布局设想.jpg），但我还是太高估自己的实力了。我先是把JavaScript入门与进阶、DOM&BOM、Ajax看了一遍（甚至没看异步编程和本地存储），就开始做项目了。
项目开始的异常艰难，由于css也几个月没碰了，JavaScript更是刚上手没多久，我写的第一个页面index.html写的异常缓慢，整个页面我写了将近一个星期。在这过程中，我不得不经常翻看前端课件，把我报错的提示复制下来百度，真的是痛苦不堪。
一周过去，我甚至连index页面都没写完（没写完新碟上架的js）。我不敢再拖了，只好转战下一个页面。好在写了一段时间后，我的思路逐渐变得清晰。写css前会先主动画好格子，而不是想到什么放什么。但是我发现我的时间依然不够，在最后一周里，我完成了剩余的3个页面。“歌单广场”由于时间不够便没做，即使已做的页面，也有很多我原本设想的功能没有实现（指登录功能以及他的延伸功能）。
在这两个星期中，我的收获还是很大的。除了学会了课件里的大部分知识点外，我还自行学会了很多别的，例如HTML的<audio>标签（靠这个没写音量进度控制功能，哈哈），JavaScript的map函数，等等。
最后，我想对看到这里的考核人员（应该是我的组长史楚莹或是杨汉铃）说，虽然我还有些许功能未能完成，但这已经是我***幡然醒悟发愤图强***的结果了。我从2023年2月7日21:00开始写这份文件，现在是21:44了，现在甚至还没传到git上。坚持写这个下来（还有点怕交不上）的原因，一是想记录一下我的心路历程，二是真的希望通过这个略带瑕疵的网易云音乐能让二位看到我希望留在红岩的信心与期望！