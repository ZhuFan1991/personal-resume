<template>
  <header class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-tips">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img width="100%" height="100%" :src="seller.avatar">
    </div>
    <div v-show="detailShow" class="detail" transition="fade">
      <div class="detail-wrapper fix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="support">
            <li v-for="item in seller.supports" class="support-item">
              <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
              <span class="text">{{seller.supports[$index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close" @click="closeDetail"></i>
      </div>
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
  import star from '../../components/star/star';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      };
    },
    components: {
      star
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      closeDetail() {
        this.detailShow = false;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .header {
    position: relative
    overflow: hidden
    color: #fff
    background-color: rgba(7, 17, 27, 0.5)
    .content-wrapper {
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar {
        display: inline-block
        margin-right: 16px
        img {
          border-radius: 2px
        }
      }
      .content {
        display: inline-block
        margin-top: 2px
        vertical-align: top
        .title {
          display: inline-block
          .brand {
            display: inline-block
            vertical-align: top
            width: 30px
            height: 16px
            margin-right: 6px
            icon-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
            line-height: 18px
          }
          .name {
            font-size: 16px
            font-weight: bold
          }
        }
        .description {
          margin-top: 8px
          font-size: 12px
          line-height: 12px
        }
        .support {
          margin-top: 10px
          .icon {
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease {
              icon-image("decrease_1")
            }
            &.discount {
              icon-image("discount_1")
            }
            &.guarantee {
              icon-image("guarantee_1")
            }
            &.invoice {
              icon-image("invoice_1")
            }
            &.special {
              icon-image("special_1")
            }
          }
          .text {
            font-size: 10px
            line-height: 12px
          }
        }
      }
      .support-count {
        position: absolute
        right: 12px
        bottom: 18px
        padding: 0 8px
        border-radius: 14px
        background-color: rgba(0, 0, 0, 0.2)
        text-align: center
        .count {
          font-size: 10px
          line-height: 24px
          vertical-align: top
        }
        .icon-keyboard_arrow_right {
          margin-left: 2px
          font-size: 10px
          line-height: 24px
        }
      }
    }
    .bulletin-wrapper {
      position: relative
      width: 100%
      height: 28px
      padding: 0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background-color: rgba(7, 17, 27, 0.2)
      .bulletin-title {
        display: inline-block
        vertical-align: top
        width: 22px
        height: 12px
        margin-top: 8px
        icon-image("bulletin")
        background-size: 22px 12px
        background-repeat: no-repeat
      }
      .bulletin-tips {
        margin: 0 4px
        font-size: 10px
        line-height: 28px
      }
      .icon-keyboard_arrow_right {
        position: absolute
        right: 12px
        top: 10px
        font-size: 10px
      }
    }
    .background {
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -2
      filter: blur(10px)
      z-index: -1
    }
    .detail {
      position: fixed
      top: 0
      left: 0
      z-index: 99
      overflow: auto

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
      .detail-wrapper {
        display: inline-block
        width: 100%
        min-height: 100%
        .detail-main {
          margin-top: 64px
          padding-bottom: 64px
          .name {
            text-align: center
            font-size: 16px
            font-weight: 700
            line-height: 16px
          }
          .star-wrapper {
            text-align: center
            margin-top: 18px
            padding: 2px 0
          }
          .title {
            display: flex
            width: 80%
            margin: 30px auto 24px auto
            .line {
              flex: 1
              position: relative
              top: -6px
              border-bottom: 1px solid rgba(255,255,255,0.2)
            }
            .text {
              text-align: center
              padding: 0 12px
              font-size: 14px
              font-weight: 700
              line-height: 14px
            }
          }
          .support {
            width: 80%
            margin: 0 auto
            padding: 0 12px
            .support-item {
              margin-bottom: 12px
              font-size: 0
              &:last-child {
                margin-bottom: 0
              }
            }
            .icon {
              display: inline-block
              vertical-align: top
              width: 16px
              height: 16px
              margin-right: 6px
              background-size: 16px 16px
              background-repeat: no-repeat
              &.decrease {
                icon-image("decrease_2")
              }
              &.discount {
                icon-image("discount_2")
              }
              &.guarantee {
                icon-image("guarantee_2")
              }
              &.invoice {
                icon-image("invoice_2")
              }
              &.special {
                icon-image("special_2")
              }
            }
            .text {
              font-size: 12px
              line-height: 16px
            }
          }
          .bulletin {
            width: 80%
            margin: 0 auto 24px auto
            padding: 0 12px
            .content {
              font-size: 12px
              line-height: 24px
            }
          }
        }
      }
      .detail-close {
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        font-size: 32px
        clear: both
      }
    }
  }
</style>
