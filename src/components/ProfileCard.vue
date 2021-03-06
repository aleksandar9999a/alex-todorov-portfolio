<template>
  <div class="card" :class="fullscreenClass">
    <div class="card__inner">
      <div class="card__image">
        <img src="./../assets/profile.jpg" alt="profile">
      </div>

      <div class="card__head">
        <img :src="expandIcon" alt="expand" @click="handleExpand">
      </div>

      <div class="card__content">
        <h1 @dblclick="handleEdit($event, 'name')">
          {{ userdata.name }}
        </h1>

        <p @dblclick="handleEdit($event, 'devType')">
          {{ userdata.devType }}
        </p>

        <div class="card__additional-data">
          <small @dblclick="handleEdit($event, 'city')">
            City: {{ userdata.city }}
          </small>

          <small @dblclick="handleEdit($event, 'years')">
            Years: {{ userdata.years }}
          </small>
        </div>

        <edit-modal ref="editModal" :header="modalData.header" :value="modalData.value" :type="modalData.type" @submit="handleSubmit" />
      </div>

      <div class="card__footer">
        <div class="social">
          <a v-for="social in links" :key="social.id" :href="social.type === 'email' ? `mailto: ${social.link}` : social.link" target="_blank">
            <img :src="social.image" :alt="social.name">
          </a>
        </div>
      </div>
    </div>

    <div class="card__section">
      <div v-if="isFullExpand" class="section-primary">
        <legend>
          Information
        </legend>

        <div class="section__inner" @dblclick="handleEdit($event, 'aboutme')">
          {{ userdata.aboutme }}
        </div>
      </div>

      <div v-if="isFullExpand" class="section-primary">
        <legend>
          Projects
        </legend>

        <div class="section__inner">
          <custom-carousel :entities="projects" @on-click="handleProject" />
        </div>
      </div>

      <div v-if="isFullExpand" class="section-primary">
        <legend>
          Experience
        </legend>

        <div class="section__inner">
          <custom-carousel :entities="experience" @on-click="handleExperience" />
        </div>
      </div>

      <div v-if="isFullExpand" class="section-primary">
        <legend>
          Certificates
        </legend>

        <div class="section__inner">
          <custom-carousel :entities="certificates" @on-click="handleCertificate" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';

// Components
import CustomCarousel from './CustomCarousel.vue';
import EditModal from './EditModal.vue';

// Interfaces
import { ISocialLink, IEntity } from '@/interfaces';
import { AuthService } from '@/services/AuthService';
import { FirestoreService } from '@/services/FirestoreService';


@Options({
  components: {
    CustomCarousel,
    EditModal
  }
})
export default class ProfileCard extends Vue {
  isExanded = false;
  isFullExpand = false;

  userdata = {
    name: '',
    devType: '',
    city: '',
    years: '',
    aboutme: ''
  }

  modalData = {
    field: '',
    header: '',
    value: '',
    type: 'input'
  }

  links: ISocialLink[] = [
    {
      id: 'instagram',
      name: 'instagram',
      link: 'https://www.instagram.com/sandi9999a/',
      image: require('./../assets/instagram.png')
    },
    {
      id: 'github',
      name: 'github',
      link: 'https://github.com/aleksandar9999a',
      image: require('./../assets/github.png')
    },
    {
      id: 'gmail',
      name: 'gmail',
      type: 'email',
      link: 'aleksandar9999a@gmail.com',
      image: require('./../assets/gmail.png')
    }
  ]

  experience: IEntity[] = []
  certificates: IEntity[] = []
  projects: IEntity[] = []
  isAuth = false;

  mounted () {
    this.loadAuth();
    this.loadUserdata();
    this.loadProjects();
    this.loadCertificates();
    this.loadExperience();
  }

  loadAuth () {
    const auth = (this as any).$authService as AuthService;

    auth.onAuthChange(user => {
      this.isAuth = !!user;
    })
  }

  loadUserdata () {
    const firestore = (this as any).$firestoreService as FirestoreService;
    
    return firestore
      .getPortfolio()
      .then(data => {
        this.userdata = data;
        return data;
      })
  }

  loadProjects () {
    const firestore = (this as any).$firestoreService as FirestoreService;

    return firestore
      .getProjects()
      .then(data => {
        this.projects = data;
        return data;
      })
  }

  loadCertificates () {
    const firestore = (this as any).$firestoreService as FirestoreService;

    return firestore
      .getCertificates()
      .then(data => {
        this.certificates = data;
        return data;
      })
  }

  loadExperience () {
    const firestore = (this as any).$firestoreService as FirestoreService;

    return firestore
      .getExperience()
      .then(data => {
        this.experience = data;
        return data;
      })
  }

  handleSubmit (value: string) {
    const setters = {
      name: (value: string) => {
        this.userdata.name = value;
      },
      devType: (value: string) => {
        this.userdata.devType = value;
      },
      city: (value: string) => {
        this.userdata.city = value;
      },
      years: (value: string) => {
        this.userdata.years = value;
      },
      aboutme: (value: string) => {
        this.userdata.aboutme = value
      }
    };

    (setters as any)[this.modalData.field](value);
  }

  handleEdit (e: MouseEvent, field: 'name' | 'devType' | 'city' | 'years' | 'aboutme') {
    if (!this.isAuth) {
      return;
    }

    const dataSetter = {
      name: () => {
        this.modalData.field = 'name';
        this.modalData.header = 'Write your name';
        this.modalData.value = this.userdata.name;
        this.modalData.type = 'input';
      },
      devType: () => {
        this.modalData.field = 'devType';
        this.modalData.header = 'You are developer?';
        this.modalData.value = this.userdata.devType;
        this.modalData.type = 'input';
      },
      city: () => {
        this.modalData.field = 'city';
        this.modalData.header = 'Write your city';
        this.modalData.value = this.userdata.city;
        this.modalData.type = 'input';
      },
      years: () => {
        this.modalData.field = 'years';
        this.modalData.header = 'Write your years';
        this.modalData.value = this.userdata.years;
        this.modalData.type = 'input';
      },
      aboutme: () => {
        this.modalData.field = 'aboutme';
        this.modalData.header = 'Write information';
        this.modalData.value = this.userdata.aboutme;
        this.modalData.type = 'textarea';
      }
    };

    dataSetter[field]();
    (this.$refs.editModal as EditModal).handleOpen(e);
  }

  get fullscreenClass () {
    return this.isExanded
      ? 'fullscreen'
      : ''
  }

  get expandIcon () {
    return this.isExanded
      ? require('./../assets/collapse.png')
      : require('./../assets/expand.png')
  }

  handleExpand (e: Event) {
    this.isExanded = !this.isExanded;

    if (this.isExanded) {
      setTimeout(() => {
        if (this.isExanded) {
          this.isFullExpand = true;
        }
      }, 500)
    } else {
      this.isFullExpand = false;
    }

    this.emitExpandState(this.isExanded);
  }

  emitExpandState (isExanded: boolean) {
    const event = isExanded
      ? 'on-expand'
      : 'on-collapse'

    this.$emit(event);
  }

  handleExperience (entity: IEntity) {
    console.debug(entity);
  }

  handleProject (entity: IEntity) {
    console.debug(entity);
  }

  handleCertificate (entity: IEntity) {
    console.debug(entity);
  }
}
</script>
