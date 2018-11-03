import { FormDefinition, ConnectedEntities, parse, BaseControl } from "@app/dynamic-forms";
import { Stack, STACK_PICK, STACK_MODES, STACK_QUOTA, STACK_RELATIONS } from "@app/game-mechanics";
import { composeFromObject, composeActionOptions, composeConditionOptions, composeChoiceOptions, composeTokenOptions, composeResourceOptions } from "../helpers";

export const composeStackForm: FormDefinition = (data: Stack, ent: ConnectedEntities) => {
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

            <Group name='items' label='Stack items' children='{items}' item='@item' addButtonText='Add'>

                <Form>

                    <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                    <NumberInput name='owner' hidden='{true}'>{@item.id}</NumberInput>

                    <Dropdown name='action' label='Action' options='{actions}'>{@item.action}</Dropdown>

                    <Dropdown name='condition' label='Condition' options='{conditions}'>{@item.condition}</Dropdown>

                    <Dropdown name='choice' label='Choice' options='{choices}'>{@item.choice}</Dropdown>

                    <Dropdown name='token' label='Token' options='{tokens}'>{@item.token}</Dropdown>

                    <Dropdown name='resource' label='Resource' options='{resources}'>{@item.resource}</Dropdown>

                    <NumberInput name='amount' label='Amount'>{@item.amount}</NumberInput>

                    <NumberInput name='min_amount' label='Min amount'>{@item.min_amount}</NumberInput>

                    <NumberInput name='max_amount' label='Max amount'>{@item.max_amount}</NumberInput>

                    <Dropdown name='relation' label='Relation' options='{relation}'>{@item.relation}</Dropdown>

                </Form>
            </Group>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data, items,
            pick: composeFromObject(STACK_PICK),
            mode: composeFromObject(STACK_MODES),
            quota: composeFromObject(STACK_QUOTA),
            relation: composeFromObject(STACK_RELATIONS),
            actions: composeActionOptions(ent),
            conditions: composeConditionOptions(ent),
            choices: composeChoiceOptions(ent),
            tokens: composeTokenOptions(ent),
            resources: composeResourceOptions(ent),
        },
    }, true);

    return result as BaseControl[];
};