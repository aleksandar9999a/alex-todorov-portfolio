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
        <h1 @dblclick="handleEdit($event, 'name')">{{ name }}</h1>

        <p @dblclick="handleEdit($event, 'devType')">{{ devType }}</p>

        <div class="card__additional-data">
          <small @dblclick="handleEdit($event, 'city')">
            City: {{ additionalData.city }}
          </small>

          <small @dblclick="handleEdit($event, 'years')">
            Years: {{ additionalData.years }}
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
          {{ aboutme }}
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

// Components
import CustomCarousel from './CustomCarousel.vue';
import EditModal from './EditModal.vue';

// Interfaces
import { ISocialLink, IEntity } from '@/interfaces';


@Options({
  components: {
    CustomCarousel,
    EditModal
  }
})
export default class ProfileCard extends Vue {
  isExanded = false;
  isFullExpand = false;

  modalData = {
    field: '',
    header: '',
    value: '',
    type: 'input'
  }

  name = 'Alexander Todorov'
  devType = 'Front-End Developer'

  additionalData = {
    city: 'Varna',
    years: '23'
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

  aboutme = 'Hello, My name is Alexander Velichkov Todorov. I am a native of Ruse, Bulgaria, 23 years old. I have loved computer technology since I was a child and for this reason I am involved in programming. I graduated in computer engineering and technology at PGEE Apostol Arnaudov in Ruse, and now I study programming at SoftUni, Sofia. So far I have one second place and two first places in applied electronics competitions, as well as a few certificates, which you can see below. There will be many more in the future!'

  experience: IEntity[] = [
    {
      id: '1',
      title: 'OrderAdmin',
      description: 'OrderAdmin is company who develop a Cloud Software for Warehouse and Delivery Services Automation.',
      start: '2020',
      end: 'now'
    },
    {
      id: '2',
      title: '2CreateStudio',
      description: '2Create is a software company who have a big portfolio of any interesting projects.',
      start: '2020',
      end: '2020'
    },
    {
      id: '3',
      title: 'Time Assistants',
      description: 'Time Assistant is a Sales Representative of Econt. We made deliveries of postal, courier and cargo shipments.',
      start: '2018',
      end: '2020'
    },
    {
      id: '4',
      title: 'Montupet Bulgaria',
      description: 'Casting of engine heads.',
      start: '2017',
      end: '2018'
    }
  ]

  certificates: IEntity[] = [
    {
      id: '1',
      title: 'VueJS',
      description: 'Building Single Page Applications with VueJS technology.',
      start: '06/03/2020',
      end: '17/04/2020'
    },
    {
      id: '2',
      title: 'Angular',
      description: 'The course teaches and TypeScript, also Architectural templates for SPA applications, components, directives, etc.',
      start: '14/01/2020',
      end: '06/03/2020'
    },
    {
      id: '3',
      title: 'JS Applications',
      description: 'The course studies HTTP requests, REST Services, what are databases and how to work with them, what is asynchronous code, Templating and Routing.',
      start: '28/10/2019',
      end: '08/12/2019'
    },
    {
      id: '4',
      title: 'JS Advanced',
      description: 'The course studies more complex concepts such as function context, explicit binding, event loop, develops algorithmic thinking, DOM tree. The functional and OOP approaches to JavaScript programming are considered. Concepts such as inheritance, object composition and prototype chain are studied.',
      start: '16/09/2019',
      end: '28/10/2019'
    },
    {
      id: '5',
      title: 'JS Fundamentals',
      description: 'The Programming Fundamentals course expands the acquired basic skills for writing program code and introduces basic techniques and tools.',
      start: '13/05/2019',
      end: '04/08/2019'
    },
    {
      id: '6',
      title: 'Programming Basics',
      description: 'The Programming Basics with C# course, giving basic programming skills',
      start: '09/03/2019',
      end: '22/04/2019'
    },
  ]

  projects: IEntity[] = [
    {
      id: 1,
      title: 'ExF',
      image: require('./../assets/exf.png'),
      description: 'Web Components on Steroids. This is a small Web Components compiler that allows you to easily create reusable, dynamic, and easy-to-use components.',
      start: '2020',
      end: 'now'
    },
    {
      id: 2,
      title: 'InterCity Journey',
      description: 'Mobile application made with the help of Ionic, React, Firebase, TypeScript and etc... The purpose of the application is to create a social network for occasional transport. Many young people prefer to travel by car instead of by bus, with the help of this application they can easily find transport.',
      image: require('./../assets/intercity.png'),
      start: '2020',
      end: 'now'
    },
    {
      id: 3,
      title: 'Ex Organizer',
      description: 'Experience Organizer is Single Page Application. Its goal is for each user to be able to create their own organization and projects. By using the app to easily track the development of a project. The project was developed with the help of VueJS, Firebase and Vuefire, VueMaterial, Vuelidate, VueRouter.',
      image: require('./../assets/ex-organizer.png'),
      start: '2020',
      end: 'now'
    }
  ]

  handleSubmit (value: string) {
    const setters = {
      name: (value: string) => {
        this.name = value;
      },
      devType: (value: string) => {
        this.devType = value;
      },
      city: (value: string) => {
        this.additionalData.city = value;
      },
      years: (value: string) => {
        this.additionalData.years = value;
      },
      aboutme: (value: string) => {
        this.aboutme = value
      }
    };

    (setters as any)[this.modalData.field](value);
  }

  handleEdit (e: MouseEvent, field: 'name' | 'devType' | 'city' | 'years' | 'aboutme') {
    const dataSetter = {
      name: () => {
        this.modalData.field = 'name';
        this.modalData.header = 'Write your name';
        this.modalData.value = this.name;
        this.modalData.type = 'input';
      },
      devType: () => {
        this.modalData.field = 'devType';
        this.modalData.header = 'You are developer?';
        this.modalData.value = this.devType;
        this.modalData.type = 'input';
      },
      city: () => {
        this.modalData.field = 'city';
        this.modalData.header = 'Write your city';
        this.modalData.value = this.additionalData.city;
        this.modalData.type = 'input';
      },
      years: () => {
        this.modalData.field = 'years';
        this.modalData.header = 'Write your years';
        this.modalData.value = this.additionalData.years;
        this.modalData.type = 'input';
      },
      aboutme: () => {
        this.modalData.field = 'aboutme';
        this.modalData.header = 'Write information';
        this.modalData.value = this.aboutme;
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
