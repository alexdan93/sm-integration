import Vue from 'vue';

import BaseModalContainer from '~/components/BaseModalContainer';
import BaseModalBox from '~/components/BaseModalBox';
import BaseBtn from '~/components/ui/BaseBtn';
import LoaderScreen from '~/components/widgets/LoaderScreen';
import BaseDD from '~/components/ui/BaseDD';

Vue.component('base-modal-container', BaseModalContainer);
Vue.component('base-modal-box', BaseModalBox);
Vue.component('base-btn', BaseBtn);
Vue.component('base-dd', BaseDD);
Vue.component('loader-screen', LoaderScreen);
