import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Source, SOURCE_RELATION, SOURCE_MODES, SOURCE_PICK, SOURCE_QUOTA } from "@app/game-mechanics";
import { composeEntityOptions, composeFromObject } from "../helpers";

export const composeSourceForm: FormDefinition = (data: Source, ent?: ConnectedEntities) => {

    data = data || {};
    const items = data.items || [];
    const cost = data.cost || [];
    const allowed = data.allowed || [];
    const restricted = data.restricted || [];
    const setups = data.setups || [];

    const template = `
        <Form>
            <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>
            
            <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>

            <TextInput name='description' label='Description'>{data.description}</TextInput>

            <ImagePicker name='image' label='Image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

            <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>

            <ButtonGroup name='setups' label='Setups' options='{setup_options}' multiple='{true}'>{setups}</ButtonGroup>

            <Dropdown name='mode' label='Mode' options='{mode}'>{data.mode}</Dropdown>

            <Dropdown name='pick' label='Pick' options='{pick}'>{data.pick}</Dropdown>

            <Dropdown name='quota' label='Quota' options='{quota}'>{data.quota}</Dropdown>

            <ButtonGroup name='restricted' label='Restrict' options='{conditions}' multiple='true'>{restricted}</ButtonGroup>

            <ButtonGroup name='allowed' label='Allow' options='{conditions}' multiple='true'>{allowed}</ButtonGroup>

            <ButtonGroup name='cost' label='Cost' options='{sources}' multiple='true'>{cost}</ButtonGroup>

            <Group name='items' label='Source items' children='{items}' item='@item' addButtonText='Add'>
                <Form>

                    <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                    <NumberInput name='owner' hidden='{true}'>{@item.owner}</NumberInput>

                    <Dropdown name='action' label='Action' options='{actions}'>{@item.action}</Dropdown>

                    <Dropdown name='condition' label='Condition' options='{@item.condition}'>{data.condition}</Dropdown>
        
                    <Dropdown name='choice' label='Choice' options='{choices}'>{@item.choice}</Dropdown>
        
                    <Dropdown name='token' label='Token' options='{tokens}'>{@item.token}</Dropdown>
        
                    <Dropdown name='source' label='Source' options='{sources}'>{@item.source}</Dropdown>

                    <NumberInput name='amount' label='Amount'>{@item.amount}</NumberInput>
        
                    <Dropdown name='relation' label='Relation' options='{relations}'>{@item.relation}</Dropdown>

                </Form>
            </Group>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data, cost, allowed, restricted, items, setups,
            relations: composeFromObject(SOURCE_RELATION),
            mode: composeFromObject(SOURCE_MODES),
            pick: composeFromObject(SOURCE_PICK),
            quota: composeFromObject(SOURCE_QUOTA),
            conditions: composeEntityOptions(ent, 'conditions'),
            setup_options: composeEntityOptions(ent, 'setups'),
            sources: composeEntityOptions(ent, 'sources'),
            tokens: composeEntityOptions(ent, 'tokens'),
            actions: composeEntityOptions(ent, 'actions'),
            choices: composeEntityOptions(ent, 'choices'),
        },
    }, true);

    return result as BaseControl[];


};