# css 媒体查询

一个媒体查询由一个可选的媒体类型和零个或多个使用媒体功能的限制了样式表范围的表达式组成，例如宽度、高度和颜色。

### 1、语法

媒体查询包含一个可选的媒体类型和媒体特性表达式(0或多个)最终会被解析为true或false。如果媒体查询中指定的媒体类型匹配展示文档所使用的设备类型，并且所有的表达式的值都是true，那么该媒体查询的结果为true。

当媒体查询为true时，其对应的样式表或样式规则就会遵循正常的级联规则进行应用。即使媒体查询返回false，`<link>` 标签指向的样式表也将会被下载(但是它们不会被应用)

具体语法如下：
```css
<!-- link元素中的CSS媒体查询 -->
<link rel="stylesheet" media="(max-width: 800px)" href="example.css" />

<!-- 样式表中的CSS媒体查询 -->
<style>
@media (max-width: 600px) {
    .facet_sidebar {
        display: none;
    }
}
</style>
```

除非使用not或only操作符，否则媒体类型是可选的，默认值是all(全部).

- ##### 逻辑操作符

***a ) `and` 操作符***

and关键字用于合并多个媒体属性或合并媒体属性与媒体类型。一个基本的媒体查询，即一个媒体属性与默认指定的all媒体类型，可能像这样子：
```css
@media (min-width: 700px) { ... }
```
如果你仅想在电视媒体上、在横屏时应用这个，你可以使用 and 操作符合并媒体属性：
```css
@media tv and (min-width: 700px) and (orientation: landscape) { ... }
```

***b ) 逗号分隔列表***

媒体查询中使用逗号分隔效果等同于or逻辑操作符。当使用逗号分隔的媒体查询时，如果任何一个媒体查询返回真，样式就是有效的。逗号分隔的列表中每个查询都是独立的，一个查询中的操作符并不影响其它的媒体查询。这意味着逗号媒体查询列表能够作用于不同的媒体属性、类型和状态。

例如，如果你想在最小宽度为700像素或是横屏的手持设备上应用一组样式，你可以这样写：
```css
@media (min-width: 700px), handheld and (orientation: landscape) { ... }
```

***c ) `not` 操作符***

not 关键字应用于整个媒体查询，在媒体查询为假时返回真。not关键字仅能应用于整个查询，而不能单独应用于一个独立的查询。例如，not在下面的查询中最后被计算：
```css
@media not all and (monochrome) { ... }
```
等价于：
```css
@media not (all and (monochrome)) { ... }
```
而不是：
```css
@media (not all) and (monochrome) { ... }
```
另一个例子，看下面的媒体查询：
```css
@media not screen and (color), print and (color)
```
等价于：
```css
@media (not (screen and (color))), print and (color)
```

***d ) `only` 操作符***

only关键字防止老旧的浏览器不支持带媒体属性的查询而应用到给定的样式：

<link rel="stylesheet" media="only screen and (color)" href="example.css" />

---

### 2、媒体特征

大多数媒体属性可以带有“min-”或“max-”前缀，用于表达“最低...”或者“最高...”。

- ##### 颜色（color）

指定输出设备每个像素单元的比特值。如果设备不支持输出颜色，则该值为0。

```
值： <color>
媒体： media/visual
是否接受 min/max 前缀：是
```

**示例：**

向所有能显示颜色的设备应用样式表：
```css
@media all and (color) { ... }
```
向每个颜色单元至少有4个比特的设备应用样式表：
```css
@media all and (min-color: 4) { ... }
```

- ##### 颜色索引（color-index）

指定了输出设备中颜色查询表中的条目数量。
```
值：<integer>
媒体： media/visual
是否接受 min/max 前缀：是
```

**示例：**

向所有使用索引颜色的设备应用样式表，你可以这么做：
```css
@media all and (color-index) { ... }
```

- ##### 宽高比（aspect-ratio）

描述了输出设备目标显示区域的宽高比。该值包含两个以“/”分隔的正整数。代表了水平像素数（第一个值）与垂直像素数（第二个值）的比例。
```
值：<ratio>
媒体： media/visual, media/tactile
是否接受 min/max 前缀：是
```
**示例：**

下面为显示区域宽高至少为一比一的设备选择了一个特殊的样式表：
```css
@media screen and (min-aspect-ratio: 1/1) { ... }
```

- ##### 设备宽高比（device-aspect-ratio）

描述了输出设备的宽高比。该值包含两个以“/”分隔的正整数。代表了水平像素数（第一个值）与垂直像素数（第二个值）的比例。

```
值：<ratio>
媒体：media/visual, media/tactile
是否接受 min/max 前缀：是
```
**示例：**

下面为宽屏设备选择了一个特殊的样式表：
```css
@media screen and (device-aspect-ratio: 16/9), screen and (device-aspect-ratio: 16/10) { ... }
```

- ##### 设备高度（device-height）

描述了输出设备的高度（整个屏幕或页的高度，而不是仅仅像文档窗口一样的渲染区域）。

```
值：<length>
媒体：media/visual, media/tactile
是否接受 min/max 前缀：是
```

- ##### 设备宽度（device-width）

描述了输出设备的宽度（整个屏幕或页的宽度，而不是仅仅像文档窗口一样的渲染区域）。
```
值：<length>
媒体： media/visual, media/tactile
是否接受 min/max 前缀：是
```

**示例：**

向显示在最大宽度800px的屏幕上的文档应用样式表，你可以这样做：

<link rel="stylesheet" media="screen and (max-device-width: 800px)" />

- ##### 网格（grid）

判断输出设备是网格设备还是位图设备。如果设备是基于网格的（例如电传打字机终端或只能显示一种字形的电话），该值为1，否则为0。
```
值：<integer>
媒体：all
是否接受 min/max 前缀： 否
```
**示例：**

向一个15字符宽度或更窄的手持设备应用样式：
```
@media handheld and (grid) and (max-width: 15em) { ... }
```

- ##### 高度（height）

`height` 媒体属性描述了输出设备渲染区域（如可视区域的高度或打印机纸盒的高度）的高度。

```
值：<length>
媒体：media/visual, media/tactile
是否接受 min/max 前缀：是
```

- ##### 方向（orientation）

指定了设备处于横屏（宽度大于高度）模式还是竖屏（高度大于宽度）模式。
```
值：landscape | portrait
媒体：media/visual
是否接受 min/max 前缀：否
```

**示例：**

向竖屏设备应用样式表：
```
@media all and (orientation: portrait) { ... }
```

- ##### 分辨率（resolution）

指定输出设备的分辨率（像素密度）。分辨率可以用每英寸（dpi）或每厘米（dpcm）的点数来表示。

```
值： <resolution>
媒体： bitmap
是否接受 min/max 前缀：是
```

**示例：**

为每英寸至多300点的打印机应用样式：

@media print and (min-resolution: 300dpi) { ... }


- ##### 宽度（width）

width 媒体属性描述了输出设备渲染区域（如可视区域的宽度或打印机纸盒的宽度）的宽度。
```
值： <length>
媒体： media/visual, media/tactile
是否接受 min/max 前缀：是
```

**示例：**

如果你想向最小宽度20em的手持设备或屏幕应用样式表，你可以使用这样的查询：
```css
@media handheld and (min-width: 20em), screen and (min-width: 20em) { ... }
```

以上就是媒体查询的基础知识。
