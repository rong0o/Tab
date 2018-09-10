### 参数表

|参数名|类型|是否必需|说明|
|---|--|--|--|
|id |string |否 |  |
|content |array |否 |tab页内容
|dispNum |uint |否 |最多展示dispNum个标签页，其余折叠
|onActive |function  |否 |  tab页切换后的回调，支持参数 (current, prev) ，current： 当前tab页的index，prev：上一个tab页的index|
|onBeforeActive |function  |否 |  tab页切换前的回调，支持参数 (next, current) next： 即将跳转的tab页index，current：当前tab页的index|

### 方法：
active(index) : 跳转到指定tab页
closeTabPage(index) : 关闭打开的tab页
openTabPage(index) : 打开新的tab页

### html 模板

```
  <div id="superTab1" class="superTab">
    <nav class='nav'>
      <a href="javascript:void(0);">1</a>
      <a href="javascript:void(0);">2</a>
      <a href="javascript:void(0);">3</a>
      <a href="javascript:void(0);">4</a>
      <a href="javascript:void(0);">5</a>
      <a href="javascript:void(0);">6</a>
      <a href="javascript:void(0);">7</a>
      <a href="javascript:void(0);">8</a>
      <a href="javascript:void(0);">9</a>
      <a href="javascript:void(0);">10</a>
      <a href="javascript:void(0);">11</a>
      <a href="javascript:void(0);">12</a>
    </nav>
    <div class="tab">
    <div class="hd-box">
      <div class="hd">
        </div>
    </div>
    <div class="bd">
    </div>
    </div>
  </div>
```