# 学习CSS布局

### 1、了解 `display` 属性:

**说明:**

display 是CSS中最重要的用于控制布局的属性。每个元素都有一个默认的 `display` 值，这与元素的类型有关。对于大多数元素它们的默认值通常是 `block` 或 `inline` 。

* #### block 

`div` 是一个标准的块级元素。一个块级元素会新开始一行并且尽可能撑满容器。其他常用的块级元素包括 `p` 、 `form` 和HTML5中的新元素： `header` 、 `footer` 、 `section` 等等。

* #### inline

span 是一个标准的行内元素。一个行内元素可以在段落中 `<span> 像这样 </span>` 包裹一些文字而不会打乱段落的布局。 a 元素是最常用的行内元素，它可以被用作链接。

* #### none

另一个常用的display值是 `none` 。一些特殊元素的默认 display 值是它，例如 `script` 。 `display:none` 通常被 JavaScript 用来在不删除元素的情况下隐藏或显示元素。

它和 `visibility` 属性不一样。把 display 设置成 `none` 元素不会占据它本来应该显示的空间，但是设置成 `visibility: hidden`; 还会占据空间。

* #### 其他 display 值

还有很多的更有意思的 display 值，例如 `list-item` 和 `table` 。[这里有一份详细的列表](https://developer.mozilla.org/en-US/docs/CSS/display)。之后会讨论到 `inline-block` 和 `flex` 。

* #### 其他

每个元素都有一个默认的 display 类型, 你可以随时随地的重写它！你可以把有特定语义的元素改成行内元素。常见的例子是：把 li 元素修改成 inline，制作成水平菜单。

---

### 2、使用 `margin: auto` 让元素居中显示:

**说明:**

设置块级元素的 `width` 可以防止它从左到右撑满整个容器。然后你就可以设置左右外边距为 auto 来使其水平居中。元素会占据你所指定的宽度，然后剩余的宽度会一分为二成为左右外边距。代码如下:
```
#main {
    width: 600px;
    margin: 0 auto; 
}
```
唯一的问题是，当浏览器窗口比元素的宽度还要窄时，浏览器会显示一个水平滚动条来容纳页面。让我们再来改进下这个方案:
```
#main {
    max-width: 600px;
    margin: 0 auto; 
}
```
在这种情况下使用 `max-width` 替代 `width` 可以使浏览器更好地处理小窗口的情况, 这点在移动设备上显得尤为重要！

顺便提下， 所有的主流浏览器包括IE7+在内都支持 `max-width` !

---

### 3、使用 `box-sizing` 控制盒模型 `width` 属性

**说明:**

当设置了元素的宽度，实际展现的元素却超出你的设置：是因为元素的边框和内边距会撑开元素。看下面的例子，两个相同宽度的元素显示的实际宽度却不一样。代码如下:
```
.simple {
    width: 500px;
    margin: 20px auto;
}

.fancy {
    width: 500px;
    margin: 20px auto;
    padding: 50px;
    border-width: 10px;
}
```
如下图所示:

<p align="left">
    <img src="../../imgdata/Exp-1_display.png" alt="Exp-1_display.png" width="500" >
</p>

当你设置一个元素为 `box-sizing: border-box;` 时，此元素的内边距和边框不再会增加它的宽度。这里有一个与前一页相同的例子，唯一的区别是两个元素都设置了 `box-sizing: border-box;` , 代码如下：
```
.simple {
    width: 500px;
    margin: 20px auto;
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;
}

.fancy {
    width: 500px;
    margin: 20px auto;
    padding: 50px;
    border: solid blue 10px;
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;
}
```
效果如下图所示:
<p align="left">
    <img src="../../imgdata/Exp-1_boxsizing.png" alt="Exp-1_boxsizing.png" width="500" >
</p>

这样可以确保所有的元素都会用这种更直观的方式排版。

不过 box-sizing 是个很新的属性，目前还应该像上面例子中那样使用 -webkit- 和 -moz- 前缀。这可以启用特定浏览器实验中的特性。同时记住它是支持IE8+的。

---

### 3、使用 `position` 属性控制元素位置

**说明:**

为了制作更多复杂的布局，我们需要学习下 position 属性。这个属性定义建立元素布局所用的定位机制。任何元素都可以定位，不过绝对或固定元素会生成一个块级框，而不论该元素本身是什么类型。相对定位元素会相对于它在正常流中的默认位置偏移。

* ##### static
```
.static {
    position: static;
}
```
`static` 是默认值。任意 `position: static;` 的元素不会被特殊的定位。一个 `static` 元素表示它不会被“positioned”（忽略 top, bottom, left, right 或者 z-index 声明），一个 `position` 属性被设置为其他值的元素表示它会被“positioned”。

* ##### relative

`relative` 表现的和 static 一样，除非你添加了一些额外的属性。如下面代码所示:
```
.relative1 {
    position: relative;
}

.relative2 {
    position: relative;
    top: -20px;
    left: 20px;
    background-color: white;
    width: 500px;
}
```
在一个相对定位（position属性的值为relative）的元素上设置 `top` 、 `right` 、 `bottom` 和 `left` 属性会使其偏离其正常位置。其他的元素的位置则不会受该元素的影响（发生位置改变来弥补它偏离后剩下的空隙）。

* ##### fixed

一个固定定位（position属性的值为fixed）元素会相对于视窗来定位，这意味着即便页面滚动，它还是会停留在相同的位置。和 `relative` 一样， `top` 、 `right` 、 `bottom` 和 `left` 属性都可用。代码如下:
```
.fixed {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 200px;
    background-color: white;
}
```
如下图所示:

<p align="left">
    <img src="../../imgdata/Exp-1_position_fixed.png" alt="Exp-1_position_fixed.png" width="300" >
</p>

一个固定定位元素不会保留它原本在页面应有的空隙（脱离文档流）。令人惊讶地是移动浏览器对 `fixed` 的支持很差。[这里有相应的解决方案](http://bradfrostweb.com/blog/mobile/fixed-position/)。

* ##### absolute

`absolute` 是最棘手的position值。 `absolute` 与 `fixed` 的表现类似，但是它不是相对于视窗而是相对于最近的“positioned”父级元素。如果绝对定位（position属性的值为absolute）的元素没有“positioned”父级元素，那么它是相对于文档的 `body` 元素，并且它会随着页面滚动而移动。

**记住一个“positioned”元素是指 `position` 值不是 `static` 的元素。**

代码如下:
```
.relative {
    position: relative;
    width: 600px;
    height: 400px;
}

.absolute {
    position: absolute;
    top: 120px;
    right: 0;
    width: 300px;
    height: 200px;
}
```
效果如下图所示

<p align="left">
    <img src="../../imgdata/Exp-1_position_absolute.png" alt="Exp-1_position_absolute.png" width="600" >
</p>

来看一个页面布局, 代码如下:
```
.container {
    position: relative;
}
nav {
    position: absolute;
    left: 0px;
    width: 200px;
}
section {
    /* position is static by default */
    margin-left: 200px;
}
footer {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 70px;
    background-color: white;
    width: 100%;
}
body {
    margin-bottom: 120px;
}
```
效果如下图所示:

<p align="left">
    <img src="../../imgdata/Exp-1_position_exp.png" alt="Exp-1_position_exp.png" width="800" >
</p>

这个例子在容器比nav元素高的时候可以正常工作。如果容器比nav元素低，那么nav会溢出到容器的外面。

---

### 4、使用 `float` 属性进行布局

**说明:**

`float` 属性定义元素在哪个方向浮动。以往这个属性总应用于图像，使文本围绕在图像周围，不过在 CSS 中，任何元素都可以浮动。浮动元素会生成一个块级框，而不论它本身是何种元素。

如果浮动非替换元素，则要指定一个明确的宽度；否则，它们会尽可能地窄。

**注释：** 假如在一行之上只有极少的空间可供浮动元素，那么这个元素会跳至下一行，这个过程会持续到某一行拥有足够的空间为止。

Float 可用于实现文字环绕图片，如:
```
img {
    float: right;
    margin: 0 0 1em 1em;
}
```
效果如下:

<p align="left">
    <img src="../../imgdata/Exp-1_float_img.png" alt="Exp-1_float_img.png" width="400" >
</p>

再来看一个例子, 代码:
```
.box {
    float: left;
    width: 200px;
    height: 100px;
    margin: 1em;
}
```
效果如下图:
<p align="left">
    <img src="../../imgdata/Exp-1_float_left.png" alt="Exp-1_float_left.png" width="800" >
</p>

不同于 `position` 属性, `float` 属性设置后, 空隙会被下面的元素 `session` 填充, 同时下面的 `session` 元素会围绕着包围整个 `div` 元素

---

### 5、使用 `clear` 属性控制浮动

**说明:**

clear 属性规定元素的哪一侧不允许其他浮动元素。

拿上面的例子进行扩展, 代码如下:
```
.box {
    float: left;
    width: 200px;
    height: 100px;
    margin: 1em;
}
.after-box {
    clear: left;
}
```
效果如下图:

<p align="left">
    <img src="../../imgdata/Exp-1_clear.png" alt="Exp-1_clear.png" width="800" >
</p>

---

### 6、使用 `clearfix` 清除浮动（clearfix hack）

**说明:**

通常我们在写html+css的时候，如果一个父级元素内部的子元素是浮动的（`float`），那么常会发生父元素不能被子元素正常撑开的情况，如下图所示：

<p align="left">
    <img src="../../imgdata/Exp-1_no_clearfix.png" alt="Exp-1_no_clearfix.png" width="600" >
</p>

加入一些新的CSS样式:
```
.clearfix {
    overflow: auto;
}
```

新的效果如下图所示:

<p align="left">
    <img src="../../imgdata/Exp-1_clearfix.png" alt="Exp-1_clearfix.png" width="600" >
</p>

---

### 7、举例: 使用浮动布局

使用 `float` 属性实现和 `position` 属性一样效果, 如下图:

<p align="left">
    <img src="../../imgdata/Exp-1_float_exp.png" alt="Exp-1_float_exp.png" width="800" >
</p>

代码如下:
```
nav {
    float: left;
    width: 200px;
}
section {
    margin-left: 200px;
}
```

---

### 8、百分比宽度

**说明:**

百分比是一种相对于包含块的计量单位。它对图片很有用：如下实现了图片宽度始终是容器宽度的50%。把页面缩小看下效果！

<p align="left">
    <img src="../../imgdata/Exp-1_float_exp.png" alt="Exp-1_float_exp.png" width="800" >
</p>

你可以用百分比做布局，但是这需要更多的工作。在下面的例子中，当窗口宽度很窄时 `nav` 的内容会以一种不太友好的方式被包裹起来。总而言之，选一种最合适你的内容的方式。

拿上面的例子举例, 修改代码:
```
nav {
    float: left;
    width: 25%;
}
section {
    margin-left: 25%;
}
```
效果如下图所示:

<p align="left">
    <img src="../../imgdata/Exp-1_percent_exp.png" alt="Exp-1_percent_exp.png" width="800" >
</p>

### 9、使用响应式布局

**说明:**

“响应式设计（Responsive Design)” 是一种让网站针对不同的浏览器和设备“呈现”不同显示效果的策略，这样可以让网站在任何情况下显示的很棒！

媒体查询是做此事所需的最强大的工具。让我们使用百分比宽度来布局，然后在浏览器变窄到无法容纳侧边栏中的菜单时，把布局显示成一列：
```
@media screen and (min-width:600px) {
  nav {
      float: left;
      width: 25%;
  }
  section {
      margin-left: 25%;
  }
}
@media screen and (max-width:599px) {
  nav li {
      display: inline;
  }
}
```
当改变屏幕分辨率时, 效果如下:

<p align="left">
    <img src="../../imgdata/Exp-1_media.png" alt="Exp-1_media.png" width="400" >
</p>

这里有一些[同样使用了媒体查询的著名站点](https://mediaqueri.es/)。点击查看[更多关于媒体查询的知识](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Media_queries)

使用 [meta viewport](http://dev.opera.com/articles/view/an-introduction-to-meta-viewport-and-viewport/) 之后可以让你的布局在移动浏览器上显示的更好。

---

### 10、使用 `inline-block` 进行布局

来看下面两种方法的例子:

- 困难的方式（使用浮动）:
```
.box {
    float: left;
    width: 200px;
    height: 100px;
    margin: 1em;
}
.after-box {
    clear: left;
}
```
容易的方式（使用inline-block）
```
.box2 {
    display: inline-block;
    width: 200px;
    height: 100px;
    margin: 1em;
}
```
最终效果如下图:

<p align="left">
    <img src="../../imgdata/Exp-1_inline_block.png" alt="Exp-1_inline_block.png" width="800" >
</p>

使用 `inline-block` 来布局时有一些事情需要牢记：

- `vertical-align` 属性会影响到 `inline-block` 元素，你可能会把它的值设置为 `top` 。

- 你需要设置每一列的宽度

- 如果HTML源代码中元素之间有空格，那么列与列之间会产生空隙

### 11、使用 `column` 属性

**说明:**

CSS columns是很新的标准，所以需要使用前缀，并且它不被IE9及以下和Opera Mini支持。还有许多和 column 相关的属性，[点击这里了解更多](http://www.quirksmode.org/css/multicolumn.html)。

来看一段CSS:
```
.three-column {
    padding: 1em;
    -moz-column-count: 3;
    -moz-column-gap: 1em;
    -webkit-column-count: 3;
    -webkit-column-gap: 1em;
    column-count: 3;
    column-gap: 1em;
}
```

最终效果如图:

<p align="left">
    <img src="../../imgdata/Exp-1_column.png" alt="Exp-1_column.png" width="400" >
</p>

---

### 12、使用 `flexbox` 进行布局

具体查看练习二: [CSS弹性盒子练习笔记](experiences/EXP-2/) （原文地址: <a href="https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout">学习弹性盒子</a>）

---

### 13、使用框架

因为 CSS 布局很难使用，所以催生了不少 CSS 框架来帮助开发者。如果你想看看那么这里有一些。只有在框架的功能满足你的需求时，使用框架才是个好主意。掌握CSS的工作方式是无可替代的。

<p align="left">
    <img src="../../imgdata/Exp-1.png" alt="Exp-1.png" width="600" >
</p>

