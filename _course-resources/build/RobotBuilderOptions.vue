<template>
  <div class="content" v-if="partsStore.parts">
    <div class="top-row">
      <!-- <div class="robot-name">
        {{ selectedRobot.head.title }}
        <span class="sale" v-if="selectedRobot.head.onSale">Sale!</span>
      </div> -->
      <PartSelector :parts="partsStore.parts.heads" @partSelected="part => selectedRobot.head = part" position="top" />
    </div>
    <div class="middle-row">
      <PartSelector :parts="partsStore.parts.arms" @partSelected="part => selectedRobot.leftArm = part" position="left" />
      <PartSelector :parts="partsStore.parts.torsos" @partSelected="part => selectedRobot.torso = part"
        position="center" />
      <PartSelector :parts="partsStore.parts.arms" @partSelected="part => selectedRobot.rightArm = part"
        position="right" />
    </div>
    <div class="bottom-row">
      <PartSelector :parts="partsStore.parts.bases" @partSelected="part => selectedRobot.base = part" position="bottom" />
    </div>
    <div class="preview">
      <CollapsibleSection>
        <template v-slot:collapse>&#x25B2; Hide</template>
        <template v-slot:expand>&#x25BC; Show</template>
        <div class="preview-content">
          <div class="top-row">
            <img :src="selectedRobot.head.imageUrl" />
          </div>
          <div class="middle-row">
            <img :src="selectedRobot.leftArm.imageUrl" class="rotate-left" />
            <img :src="selectedRobot.torso.imageUrl" />
            <img :src="selectedRobot.rightArm.imageUrl" class="rotate-right" />
          </div>
          <div class="bottom-row">
            <img :src="selectedRobot.base.imageUrl" />
          </div>
        </div>
      </CollapsibleSection>
      <button class="add-to-cart" @click="addToCart()">Add to Cart</button>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia';

import PartSelector from './PartSelector.vue';
import CollapsibleSection from '../shared/CollapsibleSection.vue';
import { useCartStore } from '../stores/cartStoreOptions';
import { usePartsStore } from '../stores/partsStoreOptions';

export default {
  components: { PartSelector, CollapsibleSection },
  mounted() { console.log('onMounted executed.'); },
  created() { this.partsStore.getParts(); },
  data() {
    return {
      selectedRobot: {
        head: {},
        leftArm: {},
        torso: {},
        rightArm: {},
        base: {},
      },
    };
  },
  computed: {
    ...mapStores(useCartStore, usePartsStore),
    headBorderColor() { return this.selectedRobot.head.onSale ? 'red' : '#aaa'; },
  },
  methods: {
    addToCart() {
      const robot = this.selectedRobot;
      const cost = robot.head.cost +
        robot.leftArm.cost +
        robot.torso.cost +
        robot.rightArm.cost +
        robot.base.cost;
      this.cartStore.cart.push({ ...robot, cost });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  position: relative;
}

.add-to-cart {
  position: absolute;
  width: 310px;
  padding: 5px;
  font-size: 24px;
  cursor: pointer;
}

.robot-name {
  position: absolute;
  top: -25px;
  text-align: center;
  width: 100%;
}

.sale {
  color: red;
}

.part {
  position: relative;
  width: 200px;
  height: 200px;
  border: 3px solid #aaa;
}

.top.part {
  border: 3px solid v-bind(headBorderColor);
}

.part {
  img {
    width: 200px;
  }
}

.top-row {
  display: flex;
  justify-content: space-around;
}

.middle-row {
  display: flex;
  justify-content: center;
}

.bottom-row {
  display: flex;
  justify-content: space-around;
  border-top: none;
}

.top {
  border-bottom: none;
}

.left {
  border-right: none;
}

.right {
  border-left: none;
}

.left img {
  transform: rotate(-90deg);
}

.right img {
  transform: rotate(90deg);
}

.bottom {
  border-top: none;
}

.prev-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 206px;
}

.next-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 206px;
}

.center .prev-selector,
.center .next-selector {
  opacity: 0.8;
}

.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 179px;
  height: 25px;
}

.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 179px;
  height: 25px;
}

.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 179px;
  height: 25px;
}

.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 179px;
  height: 25px;
}

.right .next-selector {
  right: -3px;
}

td,
th {
  text-align: left;
  padding: 5px;
  padding-right: 20px;
}

.cost {
  text-align: right;
}

.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 310px;
  height: 310px;
  padding: 5px;
}

.preview-content {
  border: 1px solid #999;
  padding: 10px;
}

.preview img {
  width: 70px;
  height: 70px;
}

.rotate-right {
  transform: rotate(90deg);
}

.rotate-left {
  transform: rotate(-90deg);
}
</style>
