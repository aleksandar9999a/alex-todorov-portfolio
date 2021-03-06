<template>
  <div v-if="isLoading" class="loading">
    <div class="loader"></div>
  </div>

  <div v-else class="details">
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

    <div class="details__foot">
      <button v-if="isAuth && details.id" @click="handleDelete">
        Delete
      </button>

      <button v-if="isAuth && !details.id" @click="handleSave">
        Save
      </button>
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
import { FirestoreService } from '@/services/FirestoreService';
import { AuthService } from '@/services/AuthService';

// Components
import EditModal from './EditModal.vue';
import 'vue3-carousel/dist/carousel.css';
import {
  Carousel,
  Slide,
  Navigation
} from 'vue3-carousel';
import { Subscription } from 'node_modules/rxjs';


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

  $firestoreService!: FirestoreService;
  $authService!: AuthService;

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

  counterSubscriber!: Subscription;
  isLoading = false;
  isAuth = false;

  mounted () {
    this.loadAuth();
    this.subscribeForLoading();
  }

  unmounted () {
    this.counterSubscriber.unsubscribe();
  }

  subscribeForLoading () {
    this.counterSubscriber = this.$firestoreService.loadingCounter.subscribe(value => {
      this.isLoading = value > 0;
    })
  }

  loadAuth () {
    this.$authService.onAuthChange(user => {
      this.isAuth = !!user;
    })
  }

  handleDelete () {
    const deleteFn = {
       project: (id: string) => {
        return this.$firestoreService.deleteProject(id);
      },
      certificate: (id: string) => {
        return this.$firestoreService.deleteCertificate(id);
      },
      experience: (id: string) => {
        return this.$firestoreService.deleteExperience(id);
      }
    }

    return deleteFn[this.type](this.details.id as string)
      .then(_ => {
        this.$emit('delete', this.details.id, this.type);
      })
  }

  handleSave () {
    const saveFn = {
      project: (data: IEntity) => {
        return this.$firestoreService.saveProject(data);
      },
      certificate: (data: IEntity) => {
        return this.$firestoreService.saveCertificate(data);
      },
      experience: (data: IEntity) => {
        return this.$firestoreService.saveExperience(data);
      }
    }

    return saveFn[this.type](this.details)
      .then(data => {
        this.details = data;
        this.$emit('save', this.details, this.type);
      })
  }

  handleSubmit (value: string) {
    const setters = {
      title: (value: string) => {
        this.details.title = value;
      },
      description: (value: string) => {
        this.details.description = value;
      },
      start: (value: string) => {
        this.details.start = value;
      },
      end: (value: string) => {
        this.details.end = value;
      },
      link: (value: string) => {
        this.details.link = value;
      },
      image: (value: string) => {
        this.details.image = value;
      }
    };

    (setters as any)[this.modalData.field](value);

    if (!this.details.id) {
      return;
    }

    const updateFn = {
      project: (id: string, update: { [key: string]: any }) => {
        return this.$firestoreService.updateProject(id, update);
      },
      certificate: (id: string, update: { [key: string]: any }) => {
        return this.$firestoreService.updateCertificate(id, update);
      },
      experience: (id: string, update: { [key: string]: any }) => {
        return this.$firestoreService.updateExperience(id, update);
      }
    }

    return updateFn[this.type](this.details.id as string, { [this.modalData.field]: value })
  }

  handleEdit (e: MouseEvent, field: 'title' | 'description' | 'start' | 'end' | 'link' | 'image') {
    if (!this.isAuth) {
      return;
    }

    const dataSetter = {
      title: () => {
        this.modalData.field = 'title';
        this.modalData.header = 'Title';
        this.modalData.value = this.details.title;
        this.modalData.type = 'input';
      },
      description: () => {
        this.modalData.field = 'description';
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

  setDetails (type: 'project' | 'certificate' | 'experience', entity?: IEntity) {
    this.details = entity
      ? entity
      : this.getDefaultState()

    this.type = type;

    return this.details;
  }

  getDefaultState () {
    return {
      id: '',
      title: 'Title',
      description: 'Description',
      start: 'now',
      end: 'never',
      link: '',
      image: '',
      images: []
    };
  }
}
</script>
