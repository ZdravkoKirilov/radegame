import { FormDefinition, ConnectedEntities, parse, BaseControl } from "@app/dynamic-forms";
import { Pool, POOL_PICK, POOL_MODES, POOL_QUOTA } from "@app/game-mechanics";
import { composeFromObject, composeActionOptions, composeConditionOptions, composeChoiceOptions, composeStackOptions, composeBooleanOptions } from "../helpers";

export const composePoolForm: FormDefinition = (data: Pool, ent: ConnectedEntities) => {
    data = data || {};
    const items = data.items || [];

    const template = `
    <Form>
        <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>
        
        <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>

        <TextInput name='description' label='Description'>{data.description}</TextInput>

        <ImagePicker name='image' label='Image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

        <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>

        <ButtonGroup name='mode' label='Mode' options='{mode}'>{data.mode}</ButtonGroup>

        <ButtonGroup name='quota' label='Quota' options='{quota}'>{data.quota}</ButtonGroup>

        <ButtonGroup name='pick' label='Pick' options='{pick}'>{data.pick}</ButtonGroup>

        <NumberInput name='min_cap' label='Min cap'>{data.min_cap}</NumberInput>

        <NumberInput name='max_cap' label='Max cap'>{data.max_cap}</NumberInput>

        <ButtonGroup name='random_cap' label='Random cap' options='{bools}'>{data.random_cap}</ButtonGroup>

        <ButtonGroup name='allow_same_pick' label='Allow same pick' options='{bools}'>{data.allow_same_pick}</ButtonGroup>

        <Group name='items' label='Pool items' children='{items}' item='@item' addButtonText='Add'>

            <Form>

                <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                <NumberInput name='owner' hidden='{true}'>{@item.id}</NumberInput>

                <Dropdown name='action' label='Action' options='{actions}'>{@item.action}</Dropdown>

                <Dropdown name='condition' label='Condition' options='{conditions}'>{@item.condition}</Dropdown>

                <Dropdown name='choice' label='Choice' options='{choices}'>{@item.choice}</Dropdown>

                <NumberInput name='quota' label='Quota'>{@item.quota}</NumberInput>

                <ButtonGroup name='restricted' label='Restricted' options='{stacks}' multiple='{true}'>{@item.restricted}</ButtonGroup>

                <ButtonGroup name='allowed' label='Allowed' options='{stacks}' multiple='{true}'>{@item.allowed}</ButtonGroup>

                <ButtonGroup name='cost' label='Cost' options='{stacks}' multiple='{true}'>{@item.cost}</ButtonGroup>

            </Form>
        </Group>

    </Form>
`;

    const result = parse({
        source: template,
        context: {
            data, items, bools: composeBooleanOptions(),
            pick: composeFromObject(POOL_PICK),
            mode: composeFromObject(POOL_MODES),
            quota: composeFromObject(POOL_QUOTA),
            actions: composeActionOptions(ent),
            conditions: composeConditionOptions(ent),
            choices: composeChoiceOptions(ent),
            stacks: composeStackOptions(ent),
        },
    }, true);

    return result as BaseControl[];
}