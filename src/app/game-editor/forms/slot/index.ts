import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Slot } from "@app/game-mechanics";
import { composeEntityOptions } from "../helpers";

export const composeSlotForm: FormDefinition = (data: Slot, ent?: ConnectedEntities) => {

    data = data || {};
    const setups = data.setups || [];
    const disable = data.disable || [];
    const enable = data.enable || [];
    const risk = data.risk || [];
    const settings = data.settings || [];
    const revealed = data.revealed || [];

    const template = `
        <Form>
            <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>
            
            <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>

            <TextInput name='description' label='Description'>{data.description}</TextInput>

            <ImagePicker name='image' label='Image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

            <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>

            <ButtonGroup name='setups' label='Setups' options='{setup_options}' multiple='{true}'>{setups}</ButtonGroup>

            <NumberInput name='x' label='Left' defaultValue='{100}'>{data.x}</NumberInput>

            <NumberInput name='y' label='Top' defaultValue='{100}'>{data.y}</NumberInput>

            <NumberInput name='width' label='Width' defaultValue='{100}'>{data.width}</NumberInput>

            <NumberInput name='height' label='Height' defaultValue='{100}'>{data.height}</NumberInput>

            <Dropdown name='field' label='Field' options='{fields}'>{data.field}</Dropdown>

            <Dropdown name='board' label='Board' options='{stages}'>{data.board}</Dropdown>

            <ButtonGroup name='tokens' label='Tokens' options='{tokens}' multiple='true'>{data.tokens}</ButtonGroup>

            <Dropdown name='source' label='Source' options='{sources}'>
                {source}
            </Dropdown>

            <ButtonGroup name='disable' label='Restrict' options='{conditions}' multiple='true'>
                {disable}
            </ButtonGroup>

            <ButtonGroup name='enable' label='Allow' options='{conditions}' multiple='true'>
                {enable}
            </ButtonGroup>

            <ButtonGroup name='risk' label='Risk' options='{sources}' multiple='true'>
                {risk}
            </ButtonGroup>

            <ButtonGroup name='settings' label='Settings' options='{conditions}' multiple='true'>
                {settings}
            </ButtonGroup>

            <Dropdown name='revealed' label='Revealed' options='{sources}'>
                {revealed}
            </Dropdown>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data, setups, enable, disable, risk, settings, revealed,
            setup_options: composeEntityOptions(ent, 'setups'),
            conditions: composeEntityOptions(ent, 'conditions'),
            sources: composeEntityOptions(ent, 'sources'),
            fields: composeEntityOptions(ent, 'fields'),
            tokens: composeEntityOptions(ent, 'tokens'),
            stages: composeEntityOptions(ent, 'stages')
        },
    }, true);

    return result as BaseControl[];


};