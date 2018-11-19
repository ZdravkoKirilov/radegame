import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Token } from "@app/game-mechanics";
import { composeEntityOptions } from "../helpers";

export const composeTokenForm: FormDefinition = (data: Token, ent: ConnectedEntities): BaseControl[] => {
    data = data || {};

    const restricted = data.restricted || [];
    const allowed = data.allowed || [];
    const cost = data.cost || [];
    const setups = data.setups || [];

    const template = `
    <Form>

        <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>

        <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>

        <TextInput name='description' label='Description'>{data.description}</TextInput>

        <ImagePicker name='image' label='Image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

        <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>

        <ButtonGroup name='setups' label='Setups' options='{setup_options}' multiple='{true}'>{setups}</ButtonGroup>

        <NumberInput name='reveal_slots' label='Reveal slots'>{data.reveal_slots}</NumberInput>

        <NumberInput name='reveal_cost' label='Reveal cost'>{data.reveal_cost}</NumberInput>

        <ButtonGroup name='allowed' label='Allowed' options='{conditions}' multiple='{true}'>{allowed}</ButtonGroup>

        <ButtonGroup name='restricted' label='Restricted' options='{conditions}' multiple='{true}'>{restricted}</ButtonGroup>

        <ButtonGroup name='cost' label='Cost' options='{sources}' multiple='{true}'>{cost}</ButtonGroup>

        <Dropdown name='board' label='Board' options='{stages}'>{data.board}</Dropdown>

        <Dropdown name='attributes' label='Attributes' options='{sources}'>{data.attributes}</Dropdown>

    </Form>
   `;

    const result = parse({
        source: template,
        context: {
            data, cost, restricted, allowed, setups,
            setup_options: composeEntityOptions(ent, 'setups'),
            sources: composeEntityOptions(ent, 'sources'),
            conditions: composeEntityOptions(ent, 'conditions'),
            stages: composeEntityOptions(ent, 'stages'),
        }
    }, true) as BaseControl[];

    return result;
};