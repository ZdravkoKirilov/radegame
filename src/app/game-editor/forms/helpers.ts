import { Option, ConnectedEntities, ToggleContext, FormDefinition, BaseControl, parse } from '@app/dynamic-forms';
import { Dictionary, toDictionary } from '@app/shared';
import { ImageAsset, GameEntity, ImageFrame, TextFrame } from '@app/game-mechanics';

import { composeStyleForm } from './style';

export function composeEntityOptions(
    items: GameEntity[],
    images: Dictionary<ImageAsset>,
    key: keyof ConnectedEntities,
    imageProp = ['image'],
    withEmptyOption = true,
): Option[] {
    items = items || [];
    const result: Option[] = items.map(elem => {
        let image;
        if (key === 'images') {
            image = elem[imageProp[0]] || elem[imageProp[1]];
        } else {
            const img = images[elem['image']];
            if (img) {
                image = img[imageProp[0]] || img[imageProp[1]];
            }
        }

        return {
            label: elem['name'],
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
    return result;
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

    <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>
`;

export const imageTemplate = `
    <Dropdown name='image' label='Image' options='{image_options}' showImage='{true}'>{data.image}</Dropdown>
`;

export const UITemplate = `
    <Dropdown name='template' label='Template' options='{widget_options}' showImage='{true}'>{data.template}</Dropdown>
`;

export const inlineStyleTemplate = `
    <EmbeddedData 
        name='style_inline' 
        label='Inline style'
        connectedEntities='{entities}' 
        childrenDefinition='{composeStyleForm}' 
    >
        {data.style_inline}
    </EmbeddedData>
`;

export const styleTemplate = `
    <CodeEditor name="style" label="Style">
        {data.style}
    </CodeEditor>

    ${inlineStyleTemplate}
`;

export const boardTemplate = `
    <Dropdown name='board' label='Board' options='{widget_options}' showImage='{true}'>{data.board}</Dropdown>
`;

export const framesTemplate = `
    <Group name='frames' label='Frames' children='{frames}' item='@frame' addButtonText='Add'>

        <Form>
            <NumberInput name='id' hidden='{true}'>{@frame.id}</NumberInput>

            <TextInput name='name' label='Name'>{@frame.name}</TextInput>

            <Dropdown name='image' label='Image' options='{image_options}' showImage='{true}'>
                {@frame.image}
            </Dropdown>

            <Dropdown name='widget' label='Widget' options='{widget_options}' showImage='{true}'>{@frame.widget}</Dropdown>

            <Dropdown name='style' label='Style' options='{style_options}' showImage='{true}'>{@frame.style}</Dropdown>

            <EmbeddedData 
                name='style_inline' 
                label='Inline style'
                connectedEntities='{entities}' 
                childrenDefinition='{composeStyleForm}' 
            >
                {@frame.style_inline}
            </EmbeddedData>
            
        </Form>

    </Group>
`;

export const textsTemplate = `
    <Group name='texts' label='Texts' children='{texts}' item='@text' addButtonText='Add'>

        <Form>
            <NumberInput name='id' hidden='{true}'>{@text.id}</NumberInput>

            <TextInput name='name' label='Name'>{@text.name}</TextInput>

            <Dropdown name='text' label='Text' options='{text_options}'>{@text.text}</Dropdown>

            <Dropdown name='style' label='Style' options='{style_options}' showImage='{true}'>{@text.style}</Dropdown>

            <EmbeddedData 
                name='style_inline' 
                label='Inline style'
                connectedEntities='{entities}' 
                childrenDefinition='{composeStyleForm}' 
            >
                {@text.style_inline}
            </EmbeddedData>
            
        </Form>

    </Group>
`;

export const composeInlineStyleFormContext = (ent: ConnectedEntities) => {
    return { composeStyleForm: composeStyleForm(true), entities: ent };
}

export const composeCommonFormContext = (ent: ConnectedEntities) => {
    ent = ent || {};
    const images = toDictionary<ImageAsset>(ent.images);

    return {
        setup_options: composeEntityOptions(ent.setups, images, 'setups'),
        token_options: composeEntityOptions(ent.tokens, images, 'tokens'),
        widget_options: composeEntityOptions(ent.widgets, images, 'widgets'),
        image_options: composeEntityOptions(ent.images, images, 'images', ['thumbnail', 'svg']),
        style_options: composeEntityOptions(ent.styles, images, 'styles'),
        sound_options: composeEntityOptions(ent.sounds, images, 'sounds'),
        expression_options: composeEntityOptions(ent.expressions, images, 'expressions'),
        animation_options: composeEntityOptions(ent.animations, images, 'animations'),
        module_options: composeEntityOptions(ent.modules, images, 'modules'),
        language_options: composeEntityOptions(ent.languages as any, images, 'languages'),
        text_options: composeEntityOptions(ent.texts, images, 'texts'),
        shape_options: composeEntityOptions(ent.shapes, images, 'shapes'),

        boolean_options: composeBooleanOptions(),
    }
};

export const composeFrameForm: FormDefinition = (data: ImageFrame, ent: ConnectedEntities): BaseControl[] => {
    data = data || {};

    const template = `
    <Form>

        <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>

        <TextInput name='name' label='Name'>{data.name}</TextInput>

        <Dropdown name='image' label='Image' options='{image_options}' showImage='{true}'>
            {data.image}
        </Dropdown>

        <Dropdown name='widget' label='Widget' options='{widget_options}' showImage='{true}'>{data.widget}</Dropdown>

        <Dropdown name='style' label='Style' options='{style_options}' showImage='{true}'>{data.style}</Dropdown>

        <EmbeddedData 
            name='style_inline' 
            label='Inline style'
            connectedEntities='{entities}' 
            childrenDefinition='{composeStyleForm}' 
        >
            {data.style_inline}
        </EmbeddedData>
    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(ent),
            ...composeInlineStyleFormContext(ent),
            data,
        }
    }, true) as BaseControl[];

    return result;
};

export const composeNestedTextForm: FormDefinition = (data: TextFrame, ent: ConnectedEntities): BaseControl[] => {
    data = data || {} as TextFrame;

    const template = `
    <Form>

        <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>

        <TextInput name='name' label='Name'>{data.name}</TextInput>

        <Dropdown name='text' label='Text' options='{text_options}'>{data.text}</Dropdown>

        <Dropdown name='style' label='Style' options='{style_options}' showImage='{true}'>{data.style}</Dropdown>

        <EmbeddedData 
            name='style_inline' 
            label='Inline style'
            connectedEntities='{entities}' 
            childrenDefinition='{composeStyleForm}' 
        >
            {data.style_inline}
        </EmbeddedData>
    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(ent),
            ...composeInlineStyleFormContext(ent),
            data,
        }
    }, true) as BaseControl[];

    return result;
};