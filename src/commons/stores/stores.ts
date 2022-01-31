import {ModalStore} from './ModalStore';
import {UserStore} from './UserStore';
import {PagerStore} from './PagerStore';

const stores = {
  $modal: new ModalStore(),
  $user: new UserStore(),
  $pager: new PagerStore(),
};

export {stores};
