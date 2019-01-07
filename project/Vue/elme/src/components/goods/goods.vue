<template>
  <div class="goods">
    <div class="menu-wrapper" v-el:menu-wrapper>
      <ul>
        <li v-for="item in goods" class="menu-item" :class="{'current':currentIndex === $index}" @click="selectMenu($index, $event)">
          <span class="text">
            <span v-if="item.type>0" :class="classMap[item.type]" class="menu-icon"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="food-wrapper" v-el:food-wrapper>
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="foods-item" @click="selectfood(food, $event)">
              <div class="food-icon"><img width="57" height="57" :src="food.icon"></div>
              <div class="content">
                <div class="food-name">{{food.name}}</div>
                <div class="food-desc">{{food.description}}</div>
                <div class="extra">
                  <span class="food-sellCount">月售{{food.sellCount}}份</span><span class="food-rating">好评率{{food.rating}}%</span>
                </div>
                <div class="food-price">
                  <span>￥{{food.price}}</span><span v-show="food.oldPrice" class="oldprice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cart-control :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart :select-food="selectFood" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shop-cart>
  </div>
  <food :food="selectedFood" v-ref:food></food>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart';
  import cartcontrol from '../cartcontrol/CartControl';
  import food from '../food/food';

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFood() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

      this.$http.get('api/goods').then((response) => {
        response = response.data;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$els.foodWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodScroll.scrollToElement(el, 300);
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$els.menuWrapper, {
          click: true
        });

        this.foodScroll = new BScroll(this.$els.foodWrapper, {
          click: true,
          probeType: 3
        });

        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$els.foodWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          height += foodList[i].clientHeight;
          this.listHeight.push(height);
        }
      },
      selectfood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      }
    },
    components: {
      ShopCart: shopcart,
      CartControl: cartcontrol,
      Food: food
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .goods {
    display: flex
    position: absolute
    overflow: hidden
    top: 174px
    left: 0
    bottom: 46px
    width: 100%
    .menu-wrapper{
      flex: 0 0 80px
      width: 80px
      background-color: #f3f5f7
      .menu-item {
        display: table
        width: 80px
        height: 54px
        padding: 0 12px
        font-size: 12px
        line-height: 14px
        .text {
          display: table-cell
          vertical-align: middle
          border-1px(rgba(7,17,27,0.1))
          .menu-icon {
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease {
              icon-image("decrease_3")
            }
            &.discount {
              icon-image("discount_3")
            }
            &.guarantee {
              icon-image("guarantee_3")
            }
            &.invoice {
              icon-image("invoice_3")
            }
            &.special {
              icon-image("special_3")
            }
          }
        }

      }
      .current {
        position: relative
        z-index: 10
        margin-top: -1px
        font-weight: 700
        background-color: #fff
        .text {
          border-none()
        }
      }
    }
    .food-wrapper {
      flex: 1
      .food-list {
        .title {
          height: 26px
          padding-left: 14px
          font-size: 12px
          line-height: 26px
          color: rgb(147,153,159)
          border-left: 2px solid #d9dde1
          background-color: #f3f5f7
        }
        .foods-item {
          display: flex
          margin: 18px
          padding-bottom: 18px
          border-1px(rgba(7,17,27,0.1))
          &:last-child {
            border-none()
            margin-bottom: 0
          }
          .food-icon {
            flex: 0 0 57px
            margin-right: 10px
            img {
              border-radius: 2px
            }
          }
          .content {
            flex: 1
            .food-name {
              margin-top: 2px
              font-size: 14px
              line-height: 14px
              color: rgb(7,17,27)
            }
            .food-desc, .extra {
              margin-top: 8px
              font-size: 10px
              line-height: 12px
              color: rgb(147,153,159)
            }
            .extra {
              .food-sellCount {
                margin-right: 12px
              }
            }
            .food-price {
              font-size: 14px
              font-weight: 700
              line-height: 24px
              color: rgb(240,20,20)
              .oldprice {
                vertical-align: top
                margin-left: 8px
                font-size: 10px
                text-decoration: line-through
                color: rgb(147,153,159)
              }
            }
            .cartcontrol-wrapper {
              position: absolute
              right: 0
              bottom: 12px
            }
          }
        }
      }
    }
  }
</style>
