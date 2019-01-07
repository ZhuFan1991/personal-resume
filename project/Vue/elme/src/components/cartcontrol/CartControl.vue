<template>
  <div class="cartcontrol">
    <div class="food-decrease" v-show="food.count > 0" @click.stop.prevent="decreaseFood($event)" transition="move">
      <span class="inner icon-remove_circle_outline"></span>
    </div>
    <div class="food-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="food-add icon-add_circle" @click.stop.prevent="addFood($event)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addFood(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      decreaseFood(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol {
    font-size: 0
    .food-decrease {
      display: inline-block
      padding: 6px
      transition: all 0.4s linear
      &.move-transition {
        opacity: 1
        transform: translate3d(0, 0, 0)
        .inner {
          display: inline-block
          font-size: 24px
          line-height: 24px
          color: rgb(0,160,220)
          transition: all 0.4s linear
          transform: rotate(0)
        }
      }
      &.move-enter, &.move-leave {
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner {
          transform: rotate(180)
        }
      }
    }
    .food-count {
      display: inline-block
      width: 12px
      height: 24px
      font-size: 12px
      line-height: 36px
      text-align: center
      vertical-align: top
      color: rgb(147,153,159)
    }
    .food-add {
      display: inline-block
      padding: 6px
      font-size: 24px
      line-height: 24px
      color: rgb(0,160,220)
    }
  }
</style>
