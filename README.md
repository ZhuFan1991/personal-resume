# 前端编程布局练习

### 1、 CSS弹性盒子练习

弹性盒子是一种新技术，但在如今各个浏览器都广泛支持的情况下，它已经开始准备广泛应用了。 弹性盒子提供了工具，允许快速创建曾经被证明用CSS很难实现的一些复杂，灵活的布局和功能。本次练习旨在通过一些例子练习，掌握其基本原理。

[查看源代码](https://github.com/ZhuFan1991/personal-resume/blob/master/experiences/exp-1.html)

你可以看到这个页面有一个含有顶级标题的 `<header>` 元素，和一个包含三个 `<article>` 的 `<section>` 元素。使用这些来创建一个非常的标准三列布局，如下图所示：

![img-1](https://raw.githubusercontent.com/ZhuFan1991/personal-resume/master/imgdata/display.png)

##### 操作一：指定元素的布局为 flexible

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

##### 操作二：通过flex-direction属性指定主轴方向

**说明：**
弹性盒子提供了 `flex-direction` 这样一个属性，它可以指定主轴的方向（弹性盒子子类放置的地方）— 它默认值是 `row`，这使得它们在按你浏览器的默认语言方向排成一排（在英语/中文浏览器中是从左到右，横向排列）。

将以下声明添加到 section 元素的 css 规则里：
```
    flex-direction: column;
```

这会将那些元素设置为列布局，就像我们添加这些 CSS 之前，如上图一所示。

---
##### 操作三：通过flex-wrap属性让弹性盒子在必要时换行

**说明：**

在布局中使用定宽或者定高的时候，可能会有一个问题：即处于容器中的弹性盒子子元素会溢出，破坏了布局。如图所示（[点击查看源代码](https://github.com/ZhuFan1991/personal-resume/blob/master/experiences/exp-2.html)）：

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
##### 操作四: 使用flex-flow属性进行缩写操作

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
##### 操作五: 控制flex项占用空间的比例

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
##### 操作六: flex的缩写与全写

**说明:**

`flex` 规定了弹性元素如何伸长或缩短以适应flex容器中的可用空间。这是一个简写属性，用来设置 `flex-grow`, `flex-shrink` 与 `flex-basis` :

- 第一个就是上面所讨论过的无单位比例。可以单独指定全写 `flex-grow` 属性的值。

- 第二个无单位比例 — `flex-shrink` — 一般用于溢出容器的 flex 项。这指定了从每个 flex 项中取出多少溢出量，以阻止它们溢出它们的容器。 这是一个相当高级的弹性盒子功能，这里不进一步说明。

- 第三个是上面讨论的最小值。可以单独指定全写 `flex-basis` 属性的值。

建议不要使用全写属性，除非你真的需要（比如要去覆盖之前写的）。使用全写会多些很多的代码，它们也可能有点让人困惑。

---
##### 操作七: 使用align-items和justify-content控制水平和垂直对齐

**说明:**

从一个新例子开始（[点击查看代码](https://github.com/ZhuFan1991/personal-resume/blob/master/experiences/exp-3.html))— 可以看到一个整洁，灵活的按钮/工具栏。 如图所示:

![exp-3_button.png](ttps://raw.githubusercontent.com/ZhuFan1991/personal-resume/master/imgdata/exp-3_button.png))

将下面的CSS添加到例子的底部:
```
div {
    display: flex;
    align-items: center;
    justify-content: space-around;
}
```








