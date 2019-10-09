# 烟雨之谜

 [ ] 这是用来求婚的小程序。

同时这个也是为了尝试wepy2.0做的试验项目。

之前想过一些别的思路，类似gps+node之类，废弃了，现在是最简单的一个状态，可以全程陪伴走过彼此的历史。

具体流程很简单，就是一个导游小程序，通过获取用户授权&地理位置授权，出谜语，谜底是地名，到地方获取位置再去下一个地方。

让媳妇以为是学生做的小程序，最后在两人相遇的地方掏出个<del>大宝贝</del>大钻戒。

那咋让媳妇相信是别人做的呢？人生在世，全靠演技啊😂

最终效果很成功👏

## 运行

```bash
git clone git@github.com:Kinice/propose_mina.git
cd propose_mina
npm install @wepy/cli -g #由于wepy2.0与1.0不互通，注意不要与现有的1.0全局冲突
npm install @wepy/cli -D #可以单独安装在项目中
npm install
npm run dev
```
