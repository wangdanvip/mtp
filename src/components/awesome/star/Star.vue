<template>
  <!--<div class="star" :class="starType">-->
  <div class="star star-24" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item" track-by="$index"></span>
  </div>
</template>

<script>
  // 定义一些下面会用到的常量
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default {
    props: {
//      size: {
//        type: Number
//      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size;
        return 'star-24';
      },
      itemClasses() {
        let result = [];
        // 这步操作可以存在半颗星的情况
        let score = Math.floor(this.score * 2) / 2;
        // 判断有没有半颗星
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);
        // 1.先求全星的  2.再求半星  3.如果数组的长度没有5的话再塞一个空星的
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }
        if (hasDecimal) {
          result.push(CLS_HALF);
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  };
</script>

<style lang="less" scoped>
  .star {
    font-size: 0;
    &.star-24 {
      .star-item {
        display: inline-block;
        background-repeat: no-repeat;
        width: 14px;
        height: 14px;
        margin-right: 3px;
        background-size: 14px 14px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          background-image: url("./star24_on.png");
        }
        &.half {
          background-image: url("./star24_half.png");
        }
        &.off {
          background-image: url("./star24_off.png");
        }
      }
    }
  }
</style>
