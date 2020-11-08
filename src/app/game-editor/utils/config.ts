export const FEATURE_NAME = 'editor';

export const STORE_KEYS = {
  modules: 'modules',
  widgets: 'widgets',
  tokens: 'tokens',
  images: 'images',
  styles: 'styles',
  sounds: 'sounds',
  expressions: 'expressions',
  animations: 'animations',
  setups: 'setups',
  texts: 'texts',
  sonatas: 'sonatas',
  shapes: 'shapes',
  sandboxes: 'sandboxes',
} as const;

export type StoreKey = keyof typeof STORE_KEYS;