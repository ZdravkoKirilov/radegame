import { Option, ConnectedEntities, ToggleContext } from '@app/dynamic-forms';
import { toDictionary } from '@app/shared';
import { ImageAsset } from '@app/game-mechanics';


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
    <TextInput name='display_name' label='Displayed name'>{data.display_name}</TextInput>
    <TextInput name='description' label='Description'>{data.description}</TextInput>
    <Dropdown name='image' label='Image' options='{images}' showImage='{true}'>{data.image}</Dropdown>
    <ButtonGroup name='keywords' label='Keywords' options='{keyword_options}' multiple='{true}'>{keywords}</ButtonGroup>
`;

export const permissionsTemplate = `
    <ButtonGroup name='enable' label='Allow' options='{conditions}' multiple='{true}'>{enable}</ButtonGroup>
    <ButtonGroup name='disable' label='Restrict' options='{conditions}' multiple='{true}'>{disable}</ButtonGroup>
`;

export const stakesTemplate = `
    <ButtonGroup name='done' label='Done' options='{sources}' multiple='{true}'>{done}</ButtonGroup>
    <ButtonGroup name='undone' label='Undone' options='{sources}' multiple='{true}'>{undone}</ButtonGroup>
`;

export const riskTemplate = `
    <ButtonGroup name='risk' label='Risk' options='{sources}' multiple='{true}'>{risk}</ButtonGroup>
`;

export const boardTemplate = `
    <Dropdown name='board' label='Board' options='{stages}' showImage='{true}'>{data.board}</Dropdown>
`;

export const settingsTemplate = `
    <ButtonGroup name='settings' label='Settings' options='{conditions}' multiple='{true}'>{settings}</ButtonGroup>
`;

export const conditionTemplate = `
    <ButtonGroup name='condition' label='Condition' options='{conditions}' multiple='{true}'>{condition}</ButtonGroup>
`;

export const revealTemplate = `
    <NumberInput name='reveal_slots' label='Reveal slots'>{data.reveal_slots}</NumberInput>

    <ButtonGroup name='reveal_cost' label='Reveal cost' options='{sources}' multiple='{true}'>
        {reveal_cost}
    </ButtonGroup>
`;

export const costTemplate = `
    <ButtonGroup name='cost' label='Cost' options='{sources}' multiple='{true}'>{cost}</ButtonGroup>
`;

export const setupsTemplate = `
    <ButtonGroup name='setups' label='Setups' options='{setup_options}' multiple='{true}'>{setups}</ButtonGroup>
`;