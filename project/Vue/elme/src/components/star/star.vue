<template>
  <div class="star" :class="starType">
    <span v-for="itemClass of itemClasses" :class="itemClass" class="starItem" track-by="$index"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const starCount = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      itemClasses() {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);

        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }
        if (hasDecimal) {
          result.push(CLS_HALF);
        }
        while (result.length < starCount) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .star {
    font-size: 0
    .starItem {
      display: inline-block
      background-repeat: no-repeat
    }
    &.star-48 {
      .starItem {
        width: 20px
        height: 20px
        margin-right: 20px
        font-size: 20px
        background-size: 20px 20px
        &:last-child {
          margin-right: 0
        }
        &.on {
          icon-image('star48_on')
        }
        &.half {
          icon-image('star48_half')
        }
        &.off {
          icon-image('star48_off')
        }
      }
    }
    &.star-36 {
      .starItem {
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &:last-child {
          margin-right: 0
        }
        &.on {
          icon-image('star36_on')
        }
        &.half {
          icon-image('star36_half')
        }
        &.off {
          icon-image('star36_off')
        }
      }
    }
    &.star-24 {
      .starItem {
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child {
          margin-right: 0
        }
        &.on {
          icon-image('star24_on')
        }
        &.half {
          icon-image('star24_half')
        }
        &.off {
          icon-image('star24_off')
        }
      }
    }
  }

</style>
