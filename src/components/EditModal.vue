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

  handleOpen (e: MouseEvent) {
    this.isOpen = true;
    this.x = e.offsetX
    this.y = e.offsetY + 20
  }

  handleClose (e?: Event) {
    this.isOpen = false;
  }
}
</script>

<style lang="scss">
.edit-modal {
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%);
  border-radius: 4px;
  background: #20b2aa;
  min-width: 200px;
  color: #151515;
  text-align: left;
  animation: fadein .3s;

  @keyframes fadein {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .edit-modal__head {
    padding: 0.5rem 0.4rem;
    font-size: 1.1rem;
    display: flex;
    align-content: center;
    justify-content: space-between;

    button {
      background: transparent;
      cursor: pointer;
      transition: opacity .3s, transform .3s;

      &:hover {
        opacity: .8;
        transform: scale(1.2);
      }
    }
  }

  .edit-modal__content {
    padding: 0.6rem;
    font-size: 0.8rem;
    display: flex;
    align-content: center;
    background: #fff;
    border-radius: 4px;

    input, textarea {
      background: transparent;
      border-bottom: 1px solid #000;
      margin-right: 0.8rem;
      padding: 0.2rem 0.4rem;
    }

    textarea {
      min-height: 8rem;
      min-width: 20rem;
      line-height: 1.2;
    }

    button {
      font-size: 0.8rem;
      background: transparent;
      transition: opacity .3s, box-shadow .3s, transform .3s;
      cursor: pointer;
      border-radius: 2px;
      padding: 0.4rem;

      &:hover {
        box-shadow: 0px 0px 20px -10px rgb(0, 0, 0, 75%);
        opacity: .8;
        transform: scale(1.2);
      }
    }
  }
}
</style>
