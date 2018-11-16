import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Team } from "@app/game-mechanics";
import { composeEntityOptions } from "../helpers";

export const composeTeamForm: FormDefinition = (data: Team, ent: ConnectedEntities): BaseControl[] => {
    data = data || {};
    const setups = data.setups || [];
    const settings = data.settings || [];

    const template = `
    <Form>

        <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>

        <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>

        <TextInput name='description' label='Description'>{data.description}</TextInput>

        <ImagePicker name='image' label='Image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

        <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>

        <ButtonGroup name='setups' label='Setups' options='{setup_options}' multiple='{true}'>{setups}</ButtonGroup>

        <Dropdown name='board' label='Board' options='{stages}'>{data.board}</Dropdown>

        <ButtonGroup name='settings' label='Settings' options='{conditions}' multiple='{true}'>{settings}</ButtonGroup>

    </Form>
   `;

    const result = parse({
        source: template,
        context: {
            data, setups, settings,
            stages: composeEntityOptions(ent, 'stages'),
            setup_options: composeEntityOptions(ent, 'setups'),
            conditions: composeEntityOptions(ent, 'conditions'),
        }
    }, true) as BaseControl[];

    return result;
};