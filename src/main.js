// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import Vuelidate from 'vuelidate';
import Vuetify from "vuetify";
import VueMq from "vue-mq";
import Vuex from "vuex";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";

const vuetifyOptions = {
    theme: {
        themes: {
            light: {
                primary: '#00CDAC',
            },
        },
    },
};

export default function (Vue, { router, head, isClient, appOptions }) {
    Vue.use(Vuelidate);
    Vue.use(Vuetify);
    Vue.use(VueMq, {
        breakpoints: {
            xs: 414,
            sm: 567,
            md: 768,
            lg: 997,
            xl: 1200,
            xxl: Infinity,
        }
    });

    Vue.use(Vuex);

    // Instantiate a new vuex store
    appOptions.store = new Vuex.Store({
        state: {
            jobDescriptionModalIsOpen: false,
            dateOfBirthModalIsOpen: false,
            startDateModalIsOpen: false,
            applicationPhase: 1,
            formValidation: {},
            hasInvalidatedFormPhase: false,
            driverApplicationPayload: {},
        },

        mutations: {
            setJobDescriptionModalState (state, isOpen) {
                state.jobDescriptionModalIsOpen = isOpen;
            },

            setDateOfBirthModalState (state, isOpen) {
                state.dateOfBirthModalIsOpen = isOpen;
            },

            setStartDateModalIsOpenState (state, isOpen) {
                state.startDateModalIsOpen = isOpen;
            },

            updateApplicationPhase (state, nextPhase = true) {
                state.applicationPhase = nextPhase
                  ? state.applicationPhase + 1
                  : state.applicationPhase - 1;
            },

            setCurrentFormPhaseValidationObject (state, validationObject) {
                state.formValidation = validationObject;
            },

            setFormPhaseValidationStatus (state, status) {
                state.hasInvalidatedFormPhase = status;
            },

            setPayload (state, driverApplicationPayload) {
                state.driverApplicationPayload = Object.assign(state.driverApplicationPayload, driverApplicationPayload);
            }
        },

        actions: {
            driverApplicationPayload ({ commit }, {
                phase,
                data,
            }) {
                const validatedData = {};

                validatedData[`phase${phase}`] = (data[`phaseQuestions${phase}`] || {}).$model;

                commit('setPayload', validatedData);
            },
        }
    });

    Vue.component('Layout', DefaultLayout);
    appOptions.vuetify = new Vuetify(vuetifyOptions);
}
