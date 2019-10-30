import { Option, ConnectedEntities, ToggleContext } from '@app/dynamic-forms';
import { toDictionary } from '@app/shared';
import { ImageAsset, GameEntity, INTERACTIVE_ENTITY, Style, Slot, Shape } from '@app/game-mechanics';
import { composeStyleForm } from './style';


export function composeEntityOptions(
    ent: ConnectedEntities,
    key: keyof ConnectedEntities,
    imageProp = ['image'],
    exclude = [],
    withEmptyOption = true,
): Option[] {
    const images = toDictionary<ImageAsset>(ent.images);

    const result: Option[] = ent[key as string].map(elem => {
        let image;
        if (key === 'images') {
            image = elem[imageProp[0]] || elem[imageProp[1]];
        } else {
            const img = images[elem.image];
            if (img) {
                image = img[imageProp[0]] || img[imageProp[1]];
            }
        }

        return {
            label: elem.name,
            value: elem.id,
            image
        };
    });
    if (withEmptyOption) {
        result.unshift({
            label: 'None',
            value: null,
        });
    }
    return exclude.length > 0 ? result.filter(elem => !exclude.includes(elem.value)) : result;
}

export function composeBooleanOptions(positive = 'Yes', negative = 'No'): Option[] {
    return [{
        label: positive,
        value: true
    }, {
        label: negative,
        value: false
    }];
}

export function composeFromObject(obj: object, useKeyOnly = false): Option[] {
    return Object.keys(obj).map(key => ({ value: key, label: useKeyOnly ? key : obj[key] }));
};

export function combineContexts(base: ToggleContext, contexts: ToggleContext[] = []): ToggleContext {
    const newContext = { ...base, show: { ...base.show } };

    contexts.forEach(ctx => {
        newContext.show.equals = [...newContext.show.equals, ...ctx.show.equals];
    });
    return newContext;
}

export const baseTemplate = `
    <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>
    <TextInput name='description' label='Description'>{data.description}</TextInput>
`;

export const imageTemplate = `
    <Dropdown name='image' label='Image' options='{image_options}' showImage='{true}'>{data.image}</Dropdown>
`;

export const doneTemplate = `
    <Dropdown name='done' label='Done if' options='{expression_options}'>
        {data.done}
    </Dropdown>
`;

export const stateTemplate = `
    <Dropdown name='state' label='Get state from' options='{expression_options}'>
        {data.state}
    </Dropdown>
`;

export const keywordsTemplate = `
    <ButtonGroup 
        name='keywords' 
        label='Keywords' 
        options='{keyword_options}' 
        multiple='{true}'>
        {keywords}
    </ButtonGroup>
`;

export const displayNameTemplate = `
    <TextInput name='display_name' label='Displayed name'>{data.display_name}</TextInput>
`;

export const styleTemplate = `
    <Dropdown name='style' label='Style' options='{style_options}' showImage='{true}'>{data.style}</Dropdown>

    <EmbeddedData 
        name='style_inline' 
        label='Inline style' 
        embeddedChildren='{inlineStyleFields}' 
        value='{parsedInlineStyle}'
    >
        {data.style_inline}
    </EmbeddedData>
`;

export const stakesTemplate = `
    <Dropdown name='passes' label='Done' options='{expression_options}'>{passes}</Dropdown>
    <Dropdown name='fails' label='Undone' options='{expression_options}'>{fails}</Dropdown>
`;

export const boardTemplate = `
    <Dropdown name='board' label='Board' options='{stage_options}' showImage='{true}'>{data.board}</Dropdown>
`;

export const framesTemplate = `
    <Group name='frames' label='Frames' children='{frames}' item='@frame' addButtonText='Add'>

        <Form>
            <NumberInput name='id' hidden='{true}'>{@frame.id}</NumberInput>

            <Dropdown name='image' label='Image' options='{image_options}' showImage='{true}' required='{true}'>
                {@frame.image}
            </Dropdown>

            <Dropdown name='style' label='Style' options='{style_options}' showImage='{true}'>{@frame.style}</Dropdown>
            
        </Form>

    </Group>
`;

export const composeInlineStyleFormContext = (data: Slot | Shape, ent: ConnectedEntities) => {
    const parsedInlineStyle: Style = data.style_inline ? JSON.parse(data.style_inline) : {};
    const inlineStyleFields = composeStyleForm(parsedInlineStyle, ent, true);
    return { parsedInlineStyle, inlineStyleFields };
}

export const composeCommonFormContext = (data: GameEntity, ent: ConnectedEntities) => {

    return {
        keyword_options: composeEntityOptions(ent, 'keywords'),
        setup_options: composeEntityOptions(ent, 'setups'),
        condition_options: composeEntityOptions(ent, 'conditions'),
        token_options: composeEntityOptions(ent, 'tokens'),
        stage_options: composeEntityOptions(ent, 'stages'),
        image_options: composeEntityOptions(ent, 'images', ['thumbnail', 'svg']),
        action_options: composeEntityOptions(ent, 'actions'),
        style_options: composeEntityOptions(ent, 'styles'),
        choice_options: composeEntityOptions(ent, 'choices'),
        sound_options: composeEntityOptions(ent, 'sounds'),
        slot_options: composeEntityOptions(ent, 'slots'),
        expression_options: composeEntityOptions(ent, 'expressions'),
        animation_options: composeEntityOptions(ent, 'animations'),
        handler_options: composeEntityOptions(ent, 'handlers'),
        round_options: composeEntityOptions(ent, 'rounds'),
        phase_options: composeEntityOptions(ent, 'phases'),
        transition_options: composeEntityOptions(ent, 'transitions'),
        language_options: composeEntityOptions(ent, 'languages'),
        text_options: composeEntityOptions(ent, 'texts'),
        shape_options: composeEntityOptions(ent, 'shapes'),

        boolean_options: composeBooleanOptions(),

        entity_types: composeFromObject(INTERACTIVE_ENTITY),
    }
};