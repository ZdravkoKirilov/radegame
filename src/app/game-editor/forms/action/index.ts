import {
    BaseControl,
    FormDefinition, ConnectedEntities, parse
} from '@app/dynamic-forms';
import {
    GameAction, ACTION_TYPE as types,
    ACTION_TARGET, ACTION_MODE, ACTION_TARGET_FILTER, COMPUTED_VALUES
} from '@app/game-mechanics';
import {
    composeFromObject, composeEntityOptions, composeBooleanOptions, baseTemplate, revealTemplate,
    costTemplate, permissionsTemplate, conditionTemplate, stakesTemplate
} from '../helpers';

export const composeActivityForm: FormDefinition = (data: GameAction, ent: ConnectedEntities) => {
    data = data || {};
    const configs = data.configs || [];
    const cost = data.cost || [];
    const disable = data.disable || [];
    const enable = data.enable || [];
    const condition = data.condition || [];
    const reveal_cost = data.reveal_cost || [];
    const done = data.done || [];
    const undone = data.undone || [];

    const template = `
        <Form>
            ${baseTemplate}

            <Dropdown name="mode" label="Mode" options='{modes}'>{data.mode}</Dropdown>

            ${revealTemplate}

            ${costTemplate}

            ${permissionsTemplate}

            ${conditionTemplate}

            ${stakesTemplate}

            <Group name='configs' label='Action configs' children='{configs}' item='@item' addButtonText='Add'>

                <Form>
                    <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                    <Dropdown name='type' label='Type' options='{types}' required='{true}'>{@item.type}</Dropdown>

                    <ButtonGroup 
                        name='target' 
                        label='Target' 
                        options='{targets}' 
                        multiple='{true}' 
                        asString='{true}' 
                        required='true'
                    >
                        {@item.target}
                    </ButtonGroup>

                    <Dropdown name='target_filter' label='Target type' options='{target_types}'>
                        {@item.target_filter}
                    </Dropdown>

                    <Dropdown name='action' label='Action' options='{actions}' showImage='{true}'>{@item.action}</Dropdown>

                    <Dropdown name='condition' label='Condition' options='{conditions}' showImage='{true}'>
                        {@item.condition}
                    </Dropdown>

                    <Dropdown name='faction' label='Faction' options='{factions}' showImage='{true}'>{@item.faction}</Dropdown>

                    <Dropdown name='token' label='Token' options='{tokens}' showImage='{true}'>{@item.token}</Dropdown>

                    <Dropdown name='choice' label='Choice' options='{choices}' showImage='{true}'>{@item.choice}</Dropdown>

                    <TextInput name='keywords' label='Keyword'>{@item.keywords}</TextInput>

                    <TextInput name='value' label='Value'>{@item.value}</TextInput>

                    <Dropdown name='computed_value' label='Computed value' options='{computedValues}'>
                        {@item.computed_value}
                    </Dropdown>

                    <NumberInput name='amount' label='Amount'>{@item.amount}</NumberInput>

                    <ButtonGroup name='random_amount' label='Randomize amount' options='{random}'>
                        {@item.random_amount}
                    </ButtonGroup>

                    <Dropdown name='dice_amount' label='Use dice' options='{choices}' showImage='{true}'>{@item.dice_amount}</Dropdown>

                    <NumberInput name='max_amount' label='Max amount'>{@item.max_amount}</NumberInput>

                    <NumberInput name='min_amount' label='Min amount'>{@item.min_amount}</NumberInput>
                </Form>

            </Group>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data, configs, cost, disable, enable, condition, reveal_cost, done, undone,
            types: composeFromObject(types),
            modes: composeFromObject(ACTION_MODE),
            targets: composeFromObject(ACTION_TARGET),
            target_types: composeFromObject(ACTION_TARGET_FILTER),
            computed_values: composeFromObject(COMPUTED_VALUES),
            sources: composeEntityOptions(ent, 'sources'),
            conditions: composeEntityOptions(ent, 'conditions'),
            choices: composeEntityOptions(ent, 'choices'),
            factions: composeEntityOptions(ent, 'factions'),
            tokens: composeEntityOptions(ent, 'tokens'),
            actions: composeEntityOptions(ent, 'actions'),
            images: composeEntityOptions(ent, 'images', ['thumbnail', 'svg']),
            random: composeBooleanOptions(),
        },
    }, true);

    return result as BaseControl[];
};

