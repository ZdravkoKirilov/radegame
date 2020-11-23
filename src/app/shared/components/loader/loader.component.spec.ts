import 'jasmine';
import { render, screen } from '@testing-library/angular';

import { NgMaterialModule } from '../../ng-material/ng-material.module';

import { LoaderComponent } from './loader.component';

describe('Shared/LoaderComponent', () => {

  it('renders without crashing', async () => {
    await render(LoaderComponent, {
      imports: [NgMaterialModule],
    });

    expect(screen.getByRole('progressbar')).not.toThrow;
  });

});

