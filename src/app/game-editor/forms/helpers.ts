import { Option, ConnectedEntities, ToggleContext } from '@app/dynamic-forms';
import { toDictionary } from '@app/shared';
import { ImageAsset, GameEntity } from '@app/game-mechanics';


export function composeEntityOptions(
    ent: ConnectedEntities,
    key: keyof ConnectedEntities,
    imageProp = ['image'],
    exclude = []): Option[] {
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

export function composeFromObject(obj: object): Option[] {
    return Object.keys(obj).map(key => ({ value: key, label: obj[key] }));
}

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
    <Dropdown name='image' label='Image' options='{image_options}' showImage='{true}'>{data.image}</Dropdown>
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

export const statesTemplate = `
    <ButtonGroup name='states' label='States' options='{state_options}' multiple='{true}'>{states}</ButtonGroup>
`;

export const displayNameTemplate = `
    <TextInput name='display_name' label='Displayed name'>{data.display_name}</TextInput>
`;

export const styleTemplate = `
    <Dropdown name='style' label='Style' options='{style_options}' showImage='{true}'>{data.style}</Dropdown>
`;

export const permissionsTemplate = `
    <ButtonGroup name='enable' label='Allow' options='{condition_options}' multiple='{true}'>{enable}</ButtonGroup>
    <ButtonGroup name='disable' label='Restrict' options='{condition_options}' multiple='{true}'>{disable}</ButtonGroup>
`;

export const stakesTemplate = `
    <ButtonGroup name='done' label='Done' options='{group_options}' multiple='{true}'>{done}</ButtonGroup>
    <ButtonGroup name='undone' label='Undone' options='{group_options}' multiple='{true}'>{undone}</ButtonGroup>
`;

export const riskTemplate = `
    <ButtonGroup name='risk' label='Risk' options='{group_options}' multiple='{true}'>{risk}</ButtonGroup>
`;

export const boardTemplate = `
    <Dropdown name='board' label='Board' options='{stage_options}' showImage='{true}'>{data.board}</Dropdown>
`;

export const settingsTemplate = `
    <ButtonGroup name='settings' label='Settings' options='{condition_options}' multiple='{true}'>{settings}</ButtonGroup>
`;

export const conditionTemplate = `
    <ButtonGroup name='condition' label='Condition' options='{condition_options}' multiple='{true}'>{condition}</ButtonGroup>
`;

export const revealTemplate = `
    <NumberInput name='reveal_slots' label='Reveal slots'>{data.reveal_slots}</NumberInput>

    <ButtonGroup name='reveal_cost' label='Reveal cost' options='{sources}' multiple='{true}'>
        {reveal_cost}
    </ButtonGroup>
`;

export const costTemplate = `
    <ButtonGroup name='cost' label='Cost' options='{group_options}' multiple='{true}'>{cost}</ButtonGroup>
`;

export const setupsTemplate = `
    <ButtonGroup name='setups' label='Setups' options='{setup_options}' multiple='{true}'>{setups}</ButtonGroup>
`;

export const fieldTemplate = `
    <Dropdown name='field' label='Field' options='{field_options}'>{data.field}</Dropdown>
`;

export const framesTemplate = `
    <Group name='frames' label='Frames' children='{frames}' item='@item' addButtonText='Add'>

        <Form>
            <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

            <Dropdown name='image' label='Image' options='{image_options}' showImage='{true}'>{@item.image}</Dropdown>

            <NumberInput name='order' required='{true}'>{@item.order}</NumberInput>
            
        </Form>

    </Group>
`;

export const composeCommonFormContext = (data: GameEntity, ent: ConnectedEntities) => ({
    keyword_options: composeEntityOptions(ent, 'keywords'),
    setup_options: composeEntityOptions(ent, 'setups'),
    condition_options: composeEntityOptions(ent, 'conditions'),
    source_options: composeEntityOptions(ent, 'sources'),
    field_options: composeEntityOptions(ent, 'fields'),
    token_options: composeEntityOptions(ent, 'tokens'),
    stage_options: composeEntityOptions(ent, 'stages'),
    image_options: composeEntityOptions(ent, 'images', ['thumbnail', 'svg']),
    action_options: composeEntityOptions(ent, 'actions'),
    group_options: composeEntityOptions(ent, 'groups'),
    style_options: composeEntityOptions(ent, 'styles'),
    choice_options: composeEntityOptions(ent, 'choices'),
    sound_options: composeEntityOptions(ent, 'sounds'),
    slot_options: composeEntityOptions(ent, 'slots'),

    disable: data.disable || [],
    enable: data.enable || [],
    keywords: data.keywords || [],
    setups: data.setups || [],
    frames: data.frames || [],
});