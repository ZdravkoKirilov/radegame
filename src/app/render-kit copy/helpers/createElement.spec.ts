import 'jasmine';

import { createElement } from './create-element';

describe('RenderKit:createElement', () => {

  const result = createElement('container', {});

  expect(result.props.children).toEqual([]);

});