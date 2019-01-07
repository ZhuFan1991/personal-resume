<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span class="block positive" :class="{'active':selectType === 2}" @click="select(2, $event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span class="block positive" :class="{'active':selectType === 0}" @click="select(0, $event)">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span class="block negative" :class="{'active':selectType === 1}" @click="select(1, $event)">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" @click="toggleContent($event)">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    methods: {
      select(type, event) {
        if (!event._constructed) {
          return;
        }
        this.selectType = type;
        this.$dispatch('ratingtype.select', type);
      },
      toggleContent(event) {
        if (!event._constructed) {
          return;
        }
        this.onlyContent = !this.onlyContent;
        this.$dispatch('content.toggle', this.onlyContent);
      }
    },
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';

  .ratingselect {
    font-size: 0
    .rating-type {
      padding: 18px 0
      border-1px(rgba(7, 17, 27, 0.1))
      .block {
        display: inline-block
        margin-right: 8px
        padding: 0 12px
        border-radius: 1px
        font-size: 12px
        line-height: 32px
        .count {
          margin-left: 2px
          font-size: 8px
        }
        &.positive {
          color: rgb(77, 85, 93)
          background: rgba(0, 160, 220, 0.2)
        }
        &.negative {
          color: rgb(77, 85, 93)
          background: rgba(77, 85, 93, 0.2)
        }
        &.active {
          color: #fff
          background: #00a0dc
        }
      }
    }
    .switch {
      padding: 12px 0
      .icon-check_circle, .text {
        margin-right: 4px
        font-size: 24px
        line-height: 24px
        color: rgb(147, 153, 159)
      }
      .text {
        vertical-align: top
        font-size: 12px
        line-height: 24px
        color: rgb(147, 153, 159)
      }
    }
  }
</style>
