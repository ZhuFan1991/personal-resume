# CSS弹性盒子练习

示例一: [exp-1](exp-1.html)

你可以看到这个页面有一个含有顶级标题的 `<header>` 元素，和一个包含三个 `<article>` 的 `<section>` 元素。使用这些来创建一个非常的标准三列布局，如下图所示：

![img-1](https://raw.githubusercontent.com/ZhuFan1991/personal-resume/master/imgdata/display.png)

---

### 操作一：指定元素的布局为 flexible

**说明：**
首先，需要选择将哪些元素设置为柔性的盒子。我们需要给这些 flexible 元素的父元素 display 设置一个特定值。在本例中，我们想要设置 `<article>` 元素，因此我们给 `<section>`（变成了 flex 容器）设置 display，代码如下：
```
section {
    display: flex;
}
```
效果如图所示：

![display_flex.png](https://raw.githubusercontent.com/ZhuFan1991/personal-resume/master/imgdata/display_flex.png)

---
flex 模型说明:
当元素表现为 flex 框时，它们沿着两个轴来布局：

![flex_terms.png](https://raw.githubusercontent.com/ZhuFan1991/personal-resume/master/imgdata/flex_terms.png)

1. **主轴**（main axis）是沿着 flex 元素放置的方向延伸的轴（横轴）。该轴的开始和结束被称为 **main start** 和 **main end**。
2. **交叉轴**（cross axis）是垂直于 flex 元素放置方向的轴（纵轴）。该轴的开始和结束被称为 **cross start** 和 **cross end**。
3. 设置了 display: flex 的父元素（在本例中是 <section>）被称之为 flex 容器（flex container）。
4. 在 flex 容器中表现为柔性的盒子的元素被称之为 flex 项（flex item）（本例中是 <article> 元素。
---

### 操作二：通过flex-direction属性指定主轴方向

**说明：**
弹性盒子提供了 `flex-direction` 这样一个属性，它可以指定主轴的方向（弹性盒子子类放置的地方）— 它默认值是 `row`，这使得它们在按你浏览器的默认语言方向排成一排（在英语/中文浏览器中是从左到右，横向排列）。

将以下声明添加到 section 元素的 css 规则里：
```
    flex-direction: column;
```

这会将那些元素设置为列布局，就像我们添加这些 CSS 之前，如上图一所示。

---
### 操作三：通过flex-wrap属性让弹性盒子在必要时换行

示例二: [exp-2](exp-2.html)

**说明：**

在布局中使用定宽或者定高的时候，可能会有一个问题：即处于容器中的弹性盒子子元素会溢出，破坏了布局。如图所示:

![no_flex-wap](https://raw.githubusercontent.com/ZhuFan1991/personal-resume/master/imgdata/no_flex-wrap.png)

我们可以看到，子代确实超出了它们的容器。解决此问题的一种方法是将以下声明添加到 section css 规则中：
```
    flex-wrap: wrap;
```

效果如下图所示：

![flex-wrap](https://raw.githubusercontent.com/ZhuFan1991/personal-resume/master/imgdata/flex-wap.png)

现在我们有了多行弹性盒子，任何溢出的元素将被移到下一行。在 **article** 元素上设置的 flex:200px规则，意味着每个元素的宽度至少是200px。

我们也可以做得更多，通过改变 `flex-direction` 属性值为 `row-reverse` — 仍然有多行布局，但是每一行元素排列的方向和原来是相反的了。

---
### 操作四: 使用flex-flow属性进行缩写操作

**说明:**

注意 `flex-direction` 和 `flex-wrap` 的缩写 `flex-flow`。比如，你可以将:

```
    flex-direction: row;
    flex-wrap: wrap;
```

替换为:
```
    flex-flow: row wrap;
```

---
### 操作五: 控制flex项占用空间的比例

**说明:**

拿第一个操作的代码进行新的修改，第一步，将以下规则添加到 CSS 的底部：
```
article {
    flex: 1;
}
```
这是一个无单位的比例值，表示每个 `flex` 项沿主轴的可用空间大小。本例中，我们设置 `<article>` 元素的 `flex` 值为 1，这表示每个元素占用空间都是相等的，占用的空间是在设置 padding 和 margin 之后剩余的空间。因为它是一个比例，这意味着将每个 flex 项的设置为 400000 的效果和 1 的时候是完全一样的。

现在在上一个规则下添加：
```
article:nth-of-type(3) {
    flex: 2;
}
```
效果如图所示:

![flex_space.png](https://raw.githubusercontent.com/ZhuFan1991/personal-resume/master/imgdata/flex_space.png)

可以看到第三个 `<article>` 元素占用了两倍的可用宽度, 前两个 flex 项各有一个，因此它们占用每个可用空间的1/4。 第三个有两个单位，所以它占用2/4或这说是1/2的可用空间。

还可以指定 flex 的最小值, 尝试修改现有的 article 规则：
```
article {
    flex: 1 200px;
}

article:nth-of-type {
    flex:2 200px;
}
```
这表示“每个flex 项将首先给出200px的可用空间，如果每个 flex 项可用小于200px, 进行平均分配。如果每个 flex 项可用空间大于200px，剩余的可用空间将根据分配的比例共享“。 

**弹性盒子的真正价值可以体现在它的灵活性/响应性，如果你调整浏览器窗口的大小，或者增加一个 <article> 元素，这时的布局仍旧是好的。**

---
### 操作六: flex的缩写与全写

**说明:**

`flex` 规定了弹性元素如何伸长或缩短以适应flex容器中的可用空间。这是一个简写属性，用来设置 `flex-grow`, `flex-shrink` 与 `flex-basis` :

- 第一个就是上面所讨论过的无单位比例。可以单独指定全写 `flex-grow` 属性的值。

- 第二个无单位比例 — `flex-shrink` — 一般用于溢出容器的 flex 项。这指定了从每个 flex 项中取出多少溢出量，以阻止它们溢出它们的容器。 这是一个相当高级的弹性盒子功能，这里不进一步说明。

- 第三个是上面讨论的最小值。可以单独指定全写 `flex-basis` 属性的值。

建议不要使用全写属性，除非你真的需要（比如要去覆盖之前写的）。使用全写会多些很多的代码，它们也可能有点让人困惑。

---
### 操作七: 使用align-items和justify-content控制水平和垂直对齐

示例三: [exp-3](exp-3.html) 

**说明:**

可以看到一个整洁，灵活的按钮/工具栏。 如图所示:

![exp-3_button.png](https://raw.githubusercontent.com/ZhuFan1991/personal-resume/master/imgdata/exp-3_button.png)

将下面的CSS添加到例子的底部, 可以看到这些按钮很好的垂直水平居中了:
```
div {
    display: flex;
    align-items: center;
    justify-content: space-around;
}
```
效果如下图所示:

![exp-3_button_align.png](https://raw.githubusercontent.com/ZhuFan1991/personal-resume/master/imgdata/exp-3_button_algin.png)
***

`align-items` 控制 flex 项在交叉轴上的位置。

- 默认的值是 `stretch`，其会使所有 flex 项沿着交叉轴的方向拉伸以填充父容器。如果父容器在交叉轴方向上没有固定宽度（即高度），则所有 flex 项将变得与最长的 flex 项一样长（即高度保持一致）。我们的第一个例子在默认情况下得到相等的高度的列的原因。

- 在上面规则中使用的 `center` 值会使这些项保持其原有的高度，但是会在交叉轴居中。这就是那些按钮垂直居中的原因。

- 你也可以设置诸如 `flex-start` 或 `flex-end` 这样使 flex 项在交叉轴的开始或结束处对齐所有的值, 比如:
```
button: first-child {
    align-self: flex-end;
}
```
效果如下图所示:

![exp-3_button_flex_end.png](https://raw.githubusercontent.com/ZhuFan1991/personal-resume/master/imgdata/exp-3_button_flex_end.png)

***

`justify-content` 控制 flex 项在主轴上的位置。

- 默认值是 `flex-start`，这会使所有 flex 项都位于主轴的开始处。

- 你也可以用 `flex-end` 来让 flex 项到结尾处。

- center 在 `justify-content` 里也是可用的，可以让 flex 项在主轴居中。

- 而我们上面用到的值 `space-around` 是很有用的——它会使所有 flex 项沿着主轴均匀地分布，在任意一端都会留有一点空间。还有一个值是 `space-between`，它和 `space-around` 非常相似，只是它不会在两端留下任何空间。

---

### 操作八: 使用order属性对flex项进行排序

**说明:**

弹性盒子可以改变 flex 项的布局位置，而不会影响到源顺序（即 dom 树里元素的顺序）。这也是传统布局方式很难做到的一点。

将下面的 CSS 添加到示例代码下面:
```
button: first-child {
    order: 1;
}
```
效果下图所示:

![exp-3_button_order.png](https://raw.githubusercontent.com/ZhuFan1991/personal-resume/master/imgdata/exp-3_button_order.png)

可以看到 "Smile" 按钮移动到了主轴的末尾。下面谈下它实现的一些细节：

- 所有 flex 项默认的 `order` 值是 0。

- `order` 值大的 flex 项比 `order` 值小的在显示顺序中更靠后。

- 相同 `order` 值的 flex 项按源顺序显示。所以假如你有四个元素，其 `order` 值分别是2，1，1和0，那么它们的显示顺序就分别是第四，第二，第三，和第一。

- 第三个元素显示在第二个后面是因为它们的 `order` 值一样，且第三个元素在源顺序中排在第二个后面。

你也可以给 `order` 设置负值使它们比值为 0 的元素排得更前面。比如，你可以设置 "Blush" 按钮排在主轴的最前面：
```
button:last-child {
    order: -1;
}
```
---

### 操作九: flex嵌套

示例四: [exp-4](exp-4.html)

**说明:**

弹性盒子也能创建一些颇为复杂的布局。设置一个元素为flex项目，那么他同样成为一个 flex 容器，它的直接子节点也表现为 flexible box。 这个例子中一个 `<section>` 元素包含了三个 `<article>` 元素。第三个 `<article>` 元素包含了三个 `<div>` ：
```
section - article
          article
          article - div - button   
                    div   button
                    div   button
                          button
                          button
```
首先，设置 `<section>` 的子节点布局为 flexible box:
```
section {
    display: flex;
}
```
然后给 `<article>` 元素设置 flex 值。特别注意这里的第二条CSS规则—我们设置第三个 `<article>` 元素的子节点的布局同样为 flex ，但是属性值为列布局。
```
article {
    flex: 1 200px;
}

article:nth-of-type(3) {
    flex: 3 200px;
    display: flex;
    flex-flow: column;
}
```
接下来选择了第一个 `<div>` , 使用 flex: 1 100px; 简单的给它一个最小的高度 100px，然后设置它的子节点（`<button>` 元素）为 flex 项。在这里将它们放在一个包装行(`wrap raw`)中，使它们居中对齐，就像在前面看到的单个按钮示例中做的那样:
```
article:nth-of-type(3) div:first-child {
    flex: 1 100px;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-around;
}
```
最后给按钮设置大小，有意思的是给它一个值为1的 `flex` 属性。如果你调整浏览器窗口宽度，你会看到这是一个非常有趣的效果。按钮将尽可能占用最多的空间，尽可能多的堆在同一条线上，但是当它们不再适合在同一条线上，他们中的一些会到下一行去:
```
button {
    flex: 1;
    margin: 5px;
    font-size: 18px;
    line-height: 1.5;
}
```
最终效果图:

![exp-3_flex.png](https://raw.githubusercontent.com/ZhuFan1991/personal-resume/master/imgdata/exp-3_flex.png)

---

### 操作十: 跨浏览器兼容性

**说明:**

大多数浏览器都支持 弹性盒子，诸如 Firefox, Chrome, Opera, Microsoft Edge 和 IE 11，较新版本的 Android/iOS 等等。但仍旧有被人使用的老浏览器不支持弹性盒子（或者支持，但是只是支持非常非常老版本的 弹性盒子）。

以上就是弹性盒子的基础知识