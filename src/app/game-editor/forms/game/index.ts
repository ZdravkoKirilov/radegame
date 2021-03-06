import { BaseControl, parse, ConnectedEntities } from '@app/dynamic-forms';
import { Game } from '@app/game-mechanics';
import { composeCommonFormContext } from '../helpers';

export function composeGameForm(data: Game, ent: ConnectedEntities): BaseControl[] {
  data = data || {} as Game;
  const languages = data.languages || [];

  const template = `
        <Form>
            <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>
            
            <TextInput name='title' required='{true}' label='Title'>{data.title}</TextInput>

            <TextInput name='description' label='Description'>{data.description}</TextInput>

            <ImagePicker name='image' label='Image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

            <CodeEditor name='get_active_language' label='Get active language' required="true">
              {data.get_active_language}
            </CodeEditor>

            <Group name='languages' label='Languages' children='{languages}' item='@item' addButtonText='Add'>
              <Form>
                  <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                  <TextInput name='name' label='Name'>{@item.name}</TextInput>

                  <TextInput name='display_name' label='Display name'>{@item.display_name}</TextInput>

                  <Dropdown name='image' label='Image' options='{image_options}' showImage='{true}'>{@item.image}</Dropdown>

              </Form>
            </Group>

        </Form>
    `;

  const result = parse({
    source: template,
    context: {
      ...composeCommonFormContext(ent),
      data, languages,
    },
  }, true);

  return result as BaseControl[];
}