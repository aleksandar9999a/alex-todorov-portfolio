<template>
  <div
    v-if="isOpen"
    class="edit-modal"
    :style="{ top: y + 'px',  left: x + 'px' }"
  >
    <div class="edit-modal__head">
      <label>{{ header }}</label>

      <button @click="handleClose">
        X
      </button>
    </div>

    <div class="edit-modal__content">
      <input v-if="type === 'input'" :value="currentValue" @change="handleChange" />

      <textarea v-else :value="currentValue" @change="handleChange" />

      <button @click="handleSubmit">
        Save
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Watch, Prop } from 'vue-property-decorator'

@Options({})
export default class EditModal extends Vue {
  isOpen = false;
  x = 0;
  y = 0;

  @Prop(String)
  type?: 'input' | 'textarea' = 'input';

  @Prop(String)
  value?: string;

  @Prop(String)
  header?: string;

  @Watch('value')
  onValueChanged(val: string, oldVal: string) {
    this.currentValue = val;
  }

  currentValue = '';

  mounted () {
    this.currentValue = (this as any).value;
  }

  handleSubmit () {
    this.$emit('submit', this.currentValue);
    this.handleClose();
  }

  handleChange (e: any) {
    this.currentValue = e.target.value;
  }

  handleOpen (e: any) {
    this.isOpen = true;
    this.x = e.x
    this.y = e.y
  }

  handleClose (e?: Event) {
    this.isOpen = false;
  }
}
</script>
