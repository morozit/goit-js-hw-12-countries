// import '@pnotify/core/dist/Material.css';
import { defaults } from '@pnotify/core';
import { defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
defaultModules.set(PNotifyMobile, {});
defaults.styling = 'material';
defaults.icons = 'material';
defaults.width = '360px';
defaults.minHeight = '40px';

defaults.delay = '1000';
defaults.closer = false;
defaults.sticker = false;
defaults.addClass = 'error';
defaults.hide = true;
defaults.autoOpen = false;

import 'material-design-icons/iconfont/material-icons.css';