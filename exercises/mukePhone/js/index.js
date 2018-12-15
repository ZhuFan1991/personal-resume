// CSS动画测试脚本
var screenAnimateElements = {
    ".screen-1": [
        ".screen-1-title",
        ".screen-1-phone",
        ".screen-1-shadow",
    ],

    ".screen-2": [
        ".screen-2-title",
        ".screen-2-tip",
        ".screen-2-phone",
        ".screen-2-point-1",
        ".screen-2-point-2",
        ".screen-2-point-3",
    ],

    ".screen-3": [
        ".screen-3-title",
        ".screen-3-tip",
        ".screen-3-phone",
        ".screen-3-features-list"
    ],

    ".screen-4": [
        ".screen-4-title",
        ".screen-4-tip",
        ".screen-4-phone-wrapper",
        // ".screen-4-features-list"
    ]
}

function setScreenAnimate(screenCls) {
    var screen = document.querySelector(screenCls);  // 获取当前屏幕的元素
    console.log(screen);
    var animateElements = screenAnimateElements[screenCls];  // 需要设置动画的元素
    var isSetAnimateClass = false;  // 是否已初始化子元素的样式
    var isAnimateDone = false;      // 子元素样式是否为 done

    screen.onclick = function () {
        // 初始化动画 给子元素增加动画属性
        if (isSetAnimateClass === false) {
            for (var i=0; i < animateElements.length; i++) {
                // 取出子元素和子元素的class属性
                var element = document.querySelector(animateElements[i]);
                var baseCls = element.getAttribute("class");

                // 重置子元素的class属性
                element.setAttribute("class", baseCls + " " + animateElements[i].substr(1) + "-animate-init")
            }
            isSetAnimateClass = true;
            return;
        }

        // 切换所有 animateElements 的 init -> done
        if (isAnimateDone === false) {
            for (var i=0; i < animateElements.length; i++) {
                // 取出子元素和子元素的class属性
                var element = document.querySelector(animateElements[i]);
                var baseCls = element.getAttribute("class");

                // 切换子元素的class属性
                element.setAttribute("class", baseCls.replace("-animate-init", "-animate-done"))
            }
            isAnimateDone = true;
            return;
        }

        // 切换所有 animateElements 的 done -> init
        if (isAnimateDone === true) {
            for (var i = 0; i < animateElements.length; i++) {
                // 取出子元素和子元素的class属性
                var element = document.querySelector(animateElements[i]);
                var baseCls = element.getAttribute("class");

                // 切换子元素的class属性
                element.setAttribute("class", baseCls.replace("-animate-done", "-animate-init"))
            }
            isAnimateDone = false;
            return;
        }
    }
}

for (k in screenAnimateElements) {
    setScreenAnimate(k);
}

