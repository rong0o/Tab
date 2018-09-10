### 参数表

|参数名|类型|是否必需|说明|
|---|--|--|--|
|id |string |否 |  |
|dispIndex |uint |否 | 首次展示的img   |
|slider |bool  |否 |  是否支持滑动切换（只针对移动端）|
|width |string |否 | 轮播图宽度 |
|height |string |否 | 轮播图高度 |
|showDot |boolean |否 |是否显示切换圆点 |
|showArrow |boolean |否 |是否显示切换箭头 |
|autoPlay |boolean |否 |是否自动轮播 |
|time |uint |否 |自动轮播时间（单位：ms） |
|onActive |function  |否 |  img 切换后的回调，支持参数 (current, prev) ，current： 当前img 的index，prev：上一个img 的index|
|onBeforeActive |function  |否 |  img 切换前的回调，支持参数 (next, current) next： 即将跳转的img index，current：当前img 的index|

### 方法：
active(index) : 跳转到指定img
stop() : 停止自动轮播

### html 模板

```
  <div id="swiper1" class="swiper ">
    <div class="bd ">
      <div class="panel" style="background-color:red">1</div>
      <div class="panel" style="background-color:blue">2</div>
      <div class="panel" style="background-color:green">3</div>
    </div>
  </div>
```