<template>
  <div class="details">
    <div class="details__image">
      <img :src="details.image || unknownImage" :alt="details.title" @dblclick="handleEdit($event, 'image')">
    </div>

    <div v-if="details.images && details.images.length > 0" class="details__images">
      <Carousel :settings="settings" :breakpoints="breakpoints">
        <Slide v-for="image in details.images" :key="image">
          <div>{{ image }}</div>
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>

    <div class="details__content">
      <h3 @click="handleLinkOpen">
        <span @dblclick="handleEdit($event, 'title')">
          {{ details.title }}
        </span>

        <img src="./../assets/link.png" alt="link" @dblclick="handleEdit($event, 'link')">
      </h3>

      <p @dblclick="handleEdit($event, 'description')">{{ details.description }}</p>
    </div>
    
    <div class="details__date">
      <time @dblclick="handleEdit($event, 'start')">
        <span>Start: </span>

        <span>{{ details.start }}</span>
      </time>

      <time @dblclick="handleEdit($event, 'end')">
        <span>End: </span>

        <span>{{ details.end }}</span>
      </time>
    </div>

    <edit-modal
      ref="editModal"
      :header="modalData.header"
      :value="modalData.value"
      :type="modalData.type"
      @submit="handleSubmit"
    />
  </div>
</template>

<script lang="ts">
// Vue
import { Options, Vue } from 'vue-class-component';

// Interfaces
import { IEntity } from '@/interfaces';

// Components
import 'vue3-carousel/dist/carousel.css';
import {
  Carousel,
  Slide,
  Navigation
} from 'vue3-carousel';
import EditModal from './EditModal.vue';


@Options({
  components: {
    Carousel,
    Slide,
    Navigation,
    EditModal
  }
})
export default class Details extends Vue {
  details: IEntity = {
    id: '',
    title: 'Title',
    description: 'Description',
    start: 'now',
    end: 'never',
    link: '',
    image: '',
    images: []
  };

  modalData = {
    field: '',
    header: '',
    value: '',
    type: 'input'
  }

  $refs!: {
    editModal: EditModal
  }

  unknownImage = require('./../assets/unknown.png');

  type: 'project' | 'certificate' | 'experience' = 'project';

  settings = {
    itemsToShow: 1,
    snapAlign: 'center'
  }

  breakpoints = {
    700: {
      itemsToShow: 2,
      snapAlign: 'center'
    }
  }

  handleSubmit () {
    console.debug(this.details);
  }

  handleEdit (e: MouseEvent, field: 'title' | 'description' | 'start' | 'end' | 'link' | 'image') {
    const dataSetter = {
      title: () => {
        this.modalData.field = 'title';
        this.modalData.header = 'Title';
        this.modalData.value = this.details.title;
        this.modalData.type = 'input';
      },
      description: () => {
        this.modalData.field = 'title';
        this.modalData.header = 'Description';
        this.modalData.value = this.details.description;
        this.modalData.type = 'textarea';
      },
      start: () => {
        this.modalData.field = 'start';
        this.modalData.header = 'Start';
        this.modalData.value = this.details.start;
        this.modalData.type = 'input';
      },
      end: () => {
        this.modalData.field = 'end';
        this.modalData.header = 'End';
        this.modalData.value = this.details.end;
        this.modalData.type = 'input';
      },
      link: () => {
        this.modalData.field = 'link';
        this.modalData.header = 'Link';
        this.modalData.value = this.details.link;
        this.modalData.type = 'input';
      },
      image: () => {
        this.modalData.field = 'image';
        this.modalData.header = 'Image';
        this.modalData.value = this.details.image;
        this.modalData.type = 'input';
      }
    };

    dataSetter[field]();
    this.$refs.editModal.handleOpen(e);
  }
  
  handleLinkOpen () {
    if (!this.details.link) {
      return;
    }

    const tab = window.open(this.details.link, '_blank') as Window;
    tab.focus();
  }

  setDetails (entity?: IEntity) {
    this.details = entity
      ? entity
      : this.getDefaultState()

    return this.details;
  }

  getDefaultState () {
    return {
      id: '',
      title: '',
      description: '',
      start: '',
      end: '',
      link: '',
      image: '',
      images: []
    };
  }
}
</script>
