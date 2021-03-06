<template>
  <div v-if="isOpen" class="modal">
    <div class="modal__inner">
      <div class="modal__head">
        <h4>{{ title }}</h4>

        <button @click="close">X</button>
      </div>

      <div class="modal__content">
        <slot></slot>
      </div>

      <div v-if="hasFooter" class="modal__foot">
        footer
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop } from 'vue-property-decorator';
import { Options, Vue } from 'vue-class-component';


@Options({})
export default class Modal extends Vue {
  isOpen = false;

  @Prop(Boolean)
  hasFooter = false;

  @Prop(String)
  title = '';

  open () {
    this.isOpen = true;
  }

  close () {
    this.isOpen = false;
  }
}
</script>
