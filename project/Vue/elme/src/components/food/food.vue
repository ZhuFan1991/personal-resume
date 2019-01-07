<template>
 <div v-show="showFlag" class="food" transition="move" v-el:food>
   <div class="food-container">
     <div class="image-header">
       <img :src="food.image">
       <div class="back" @click="hide">
         <i class="icon-arrow_lift"></i>
       </div>
     </div>
     <div class="food-content">
       <h1 class="food-name">{{food.name}}</h1>
       <div class="extra">
         <span class="sell-count">月售{{food.sellCount}}份</span><span class="sell-rating"></span>好评率{{food.rating}}%
       </div>
       <div class="food-price">
         <span>￥{{food.price}}</span><span v-show="food.oldPrice" class="oldprice">￥{{food.oldPrice}}</span>
       </div>
       <div class="add-cart" v-show="!food.count || food.count === 0" @click="addCart($event)">加入购物车</div>
       <div class="cartcontrol-wrapper">
         <cart-control :food="food"></cart-control>
       </div>
     </div>
     <split v-show="food.info"></split>
     <div class="food-info" v-show="food.info">
       <h1 class="title">商品信息</h1>
       <p class="text">{{food.info}}</p>
     </div>
     <split></split>
     <div class="food-rating">
       <h1 class="title">商品信息</h1>
       <div class="rating-wrapper">
         <rating-select :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></rating-select>
       </div>
       <div class="rating-content">
         <ul v-show="food.ratings && food.ratings.length">
           <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" class="rating-item">
             <div class="user">
               <span class="name">{{rating.username}}</span>
               <img :src="rating.avatar" class="avatar" width="12" height="12">
             </div>
             <div class="time">{{rating.rateTime | formatDate}}</div>
             <p class="text">
               <span :class="{'icon-thumb_up':rating.rateType===0, 'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
             </p>
           </li>
         </ul>
         <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
       </div>
     </div>
   </div>
 </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  import { formatDate } from '../../common/js/date';

  import cartcontrol from '../cartcontrol/CartControl';
  import split from '../split/Split';
  import ratingselect from '../ratingselect/RatingSelect';

  // const POSITIVE = 0;
  // const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    methods: {
      show() {
        this.showFlag = true;

        this.onlyContent = true;
        this.selectType = ALL;

        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$els.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    events: {
      'ratingtype.select'(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      'content.toggle'(onlyContent) {
        this.onlyContent = onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      CartControl: cartcontrol,
      Split: split,
      RatingSelect: ratingselect
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';

  .food {
    position: fixed
    top: 0
    left: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    &.move-transition {
      transition: all 0.2s linear
      transform: translate3d(0, 0, 0)
    }
    &.move-enter, &.move-leave {
      transform: translate3d(100%, 0, 0)
    }
    .food-container {
      position: relative
      .image-header {
        position: relative
        width: 100%
        height: 0
        padding-top: 100%
        img {
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
        }
        .back {
          position: fixed
          top: 10px
          left: 0
          .icon-arrow_lift {
            display: block
            padding: 10px
            font-size: 20px
            color: #fff
          }
        }
      }
      .food-content {
        position: relative
        width: 100%
        padding: 18px
        .food-name {
          font-size: 14px
          font-weight: 700
          line-height: 14px
          color: rgb(7, 17, 27)
        }
        .extra {
          margin-top: 8px
          font-size: 10px
          line-height: 10px
          color: rgb(147, 153, 159)
          .sell-count {
            margin-right: 8px
          }
        }
        .food-price {
          margin-top: 18px
          font-size: 14px
          font-weight: 700
          line-height: 24px
          color: rgb(240, 20, 20)
          .oldprice {
            vertical-align: top
            margin-left: 8px
            font-size: 10px
            text-decoration: line-through
            color: rgb(147, 153, 159)
          }

        }
        .add-cart {
          position: absolute
          z-index: 10
          right: 18px
          bottom: 18px

          padding: 0 12px
          border-radius: 12px
          height: 24px

          font-size: 10px
          line-height: 24px
          color: #fff
          background: #00a0dc
        }
        .cartcontrol-wrapper {
          position: absolute
          right: 12px
          bottom: 12px
        }
      }

      .food-info {
        padding: 18px
        .title {
          margin-bottom: 6px
          font-size: 14px
          font-weight: 500
          line-height: 14px
          color: rgb(7, 17, 27)
        }
        .text {
          font-size: 12px
          line-height: 24px
          color: rgb(77, 85, 93)
        }
      }
      .food-rating {
        margin: 18px 0
        padding: 0 18px
        border-1px(rgba(7, 17, 27, 0.1))
        .title {
          margin-bottom: 6px
          font-size: 14px
          font-weight: 500
          line-height: 14px
          color: rgb(7, 17, 27)
        }
        .rating-content {
          padding: 0 18px
          .rating-item {
            position: relative
            padding: 16px 0
            border-1px(rgba(7, 17, 27, 0.1))
            .user {
              position: absolute
              right: 0
              top: 16px
              line-height: 12px
              font-size: 0
              .name {
                display: inline-block
                vertical-align: top
                margin-right: 6px
                font-size: 10px
                color: rgb(147, 153, 159)
              }
              .avatar {
                border-radius: 50%
              }
            }
            .time {
              margin-bottom: 6px
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
            }
            .text {
              font-size: 12px
              line-height: 16px
              color: rgb(7, 17, 27)
              .icon-thumb_up, .icon-thumb_down {
                margin-right: 4px
                font-size: 12px
                line-height: 24px
              }
              .icon-thumb_up {
                color: rgb(0, 160, 220)
              }
              .icon-thumb_down {
                color: rgb(147, 153, 159)
              }
            }
          }
          .no-rating {
            padding: 16px 0
            font-size: 12px
            color: rgb(147, 153, 159)
          }
        }
      }
    }
  }


</style>
