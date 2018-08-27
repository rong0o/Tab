### 参数表

|参数名|类型|是否必需|说明|
|---|--|--|--|
|tabId |string |是 |  |
|dispIndex |uint |否 | 首次展示的tab页  |
|slider |bool  |否 |  是否支持滑动切换（只针对移动端）|
|tabType |string  |否 |  tab头选中时的样式，one of: bottom, border, top|
|tabWidthType |string  |否 |  tab头的宽度，one of:auto, fix|
|tabWidth |string  |否 | tabWidthType选择fix时，设置的宽度值 |
|onActive |function  |否 |  tab页切换后的回调，支持参数 (current, prev) ，current： 当前tab页的index，prev：上一个tab页的index|
|onBeforeActive |function  |否 |  tab页切换前的回调，支持参数 (next, current) next： 即将跳转的tab页index，current：当前tab页的index|


### 方法：
active(index) : 跳转到指定tab页

### html 模板

```
  <div id="tab1" class="im-tab">
    <div class="im-tab-hd">
      <a href="javascript:void(0);">tab1</a>
      <a href="javascript:void(0);">tab2</a>
      <a href="javascript:void(0);">tab3</a>
    </div>
    <div class="im-tab-bd">
      <div class="im-tab-panel">1
      </div>
      <div class="im-tab-panel">2</div>
      <div class="im-tab-panel">3</div>
    </div>
  </div>
```