<template>
  <div class="shop-cart">
    <div class="cart-wrapper">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highLight': totalCount > 0}" @click="foldControl">
            <i class="icon-shopping_cart" :class="{'highLight': totalCount > 0}"></i>
          </div>
          <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highLight': totalPrice > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payStatus">{{payDesc}}</div>
      </div>
    </div>
    <div class="shopcart-list" v-show="listshow" transition="fold">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="clearList">清空</span>
      </div>
      <div class="list-content" v-el:list-content>
        <ul>
          <li v-for="food in selectFood" class="food-item">
            <span class="food-name">{{food.name}}</span>
            <span class="food-price">{{food.price*food.count}}</span>
            <div class="cartcontrol-wrapper">
              <cart-control :food="food"></cart-control>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="list-mask" v-show="listshow" @click="hideList" transition="fade"></div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from '../cartcontrol/CartControl';

  export default {
    props: {
      selectFood: {
        type: Array
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    components: {
      CartControl: cartcontrol
    },
    data() {
      return {
        fold: true
      };
    },
    computed: {
      totalPrice() {
        let price = 0;
        this.selectFood.forEach((item) => {
          price += item.price * item.count;
        });
        return price;
      },
      totalCount() {
        let total = 0;
        this.selectFood.forEach((item) => {
          total += item.count;
        });
        return total;
      },
      payStatus() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'pay-enough';
        }
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `${this.minPrice}起送`;
        } else if (this.totalPrice < this.minPrice) {
          let final = this.minPrice - this.totalPrice;
          return `还差￥${final}元起送`;
        } else {
          return '去结算';
        }
      },
      listshow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        } else {
          let show = !this.fold;
          if (show) {
            this.$nextTick(() => {
              if (!this.cartScroll) {
                this.cartScroll = new BScroll(this.$els.listContent, {
                  click: true
                });
              } else {
                this.cartScroll.refresh();
              }
            });
          }
          return show;
        }
      }
    },
    methods: {
      foldControl() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      clearList() {
        this.selectFood.forEach((food) => {
          food.count = 0;
        });
      },
      hideList() {
        this.fold = true;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';

  .shop-cart {
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .cart-wrapper {
      display: flex
      font-size: 0
      color: rgba(255,255,255,0.4)
      background-color: #141d27
      .content-left {
        flex: 1
        .logo-wrapper {
          display: inline-block
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          vertical-align: top
          border-radius: 50%
          background-color: #141d27
          .logo {
            width: 100%
            height: 100%
            text-align: center
            border-radius: 50%
            background: #2b343c
            &.highLight {
              background-color: rgb(0,160,220)
            }
            .icon-shopping_cart {
              font-size: 24px
              line-height: 44px
              &.highLight{
                color: #fff
              }
            }
          }
          .num {
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            font-size: 9px
            line-height: 16px
            text-align: center
            color: #ffffff
            border-radius: 16px
            background-color: rgb(240,20,20)
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
          }
        }
        .price {
          display: inline-block
          margin: 12px 0
          padding-right: 12px
          font-size: 16px
          font-weight: 700
          line-height: 24px
          border-right: 1px solid #80858a
          &.highLight{
            color: #fff
          }
        }
        .desc {
          display: inline-block
          margin: 12px
          font-size: 12px
          line-height: 24px
          vertical-align: top
        }
      }
      .content-right {
        flex: 0 0 105px
        width: 105px
        .pay {
          padding: 12px 0
          font-size: 12px
          font-weight: 700
          line-height: 24px
          text-align: center
          &.not-enough {
            background-color: #2b333b
          }
          &.pay-enough {
            background-color: #00b43c
            color: #fff
          }
        }
      }
    }
    .shopcart-list {
      position: absolute;
      left: 0
      top: 0
      z-index: -1
      width: 100%
      &.fold-transition {
        transition: all 0.5s
        transform: translate3d(0, -100%, 0)
      }
      &.fold-enter, &.fold-leave {
        transform: translate3d(0, 0, 0)
      }
      .list-header {
        width: 100%
        height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title {
          float: left
          font-size: 14px
          line-height: 40px
          color: rgb(7, 17, 27)
        }
        .empty {
          float: right
          font-size: 12px
          line-height: 40px
          color: rgb(0, 160, 220)
        }
      }
      .list-content {
        padding: 0 18px
        max-height: 217px
        background: #fff
        overflow: hidden
        .food-item {
          position: relative
          padding: 12px 0
          width: 100%
          height: 48px
          border-1px(rgba(7, 17, 27, 0.1))
          .food-name {
            font-size: 14px
            line-height: 24px
            color: rgb(7, 17, 27)
          }
          .food-price {
            position: absolute
            right: 90px
            bottom: 12px
            font-size: 14px
            font-weight: 700
            line-height: 24px
            color: rgb(240, 20, 20)
          }
          .cartcontrol-wrapper {
            position: absolute
            right: 0
            bottom: 6px
          }
        }

      }
    }
  }
  .list-mask {
    position: fixed
    top: 0
    left: 0
    z-index: 40
    width: 100%
    height: 100%
    backdrop-filter: blur(10px)
    transition: all 0.5s
    &.fade-transition {
      opacity: 1
      background-color: rgba(7,17,27,0.8)
    }
    &.fade-enter, &.fade-leave {
      opacity: 0
      background-color: rgba(7,17,27,0)
    }
  }
</style>
