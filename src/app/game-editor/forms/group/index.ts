import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Group, GROUP_RELATION, GameEntity } from "@app/game-mechanics";
import { composeEntityOptions, baseTemplate, composeFromObject, composeCommonFormContext } from "../helpers";

export const composeGroupForm: FormDefinition = (data: Group, ent?: ConnectedEntities) => {

    data = data || {};
    const items = data.items || [];

    const template = `
        <Form>
            ${baseTemplate}

            <Group name='items' label='Source items' children='{items}' item='@item' addButtonText='Add'>
                <Form>

                    <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                    <NumberInput name='owner' hidden='{true}'>{@item.owner}</NumberInput>

                    <ButtonGroup name='cost' label='Cost' options='{sources}' multiple='{true}'>
                        {@item.cost}
                    </ButtonGroup>

                    <ButtonGroup name='enable' label='Enable' options='{conditions}' multiple='{true}'>
                        {@item.enable}
                    </ButtonGroup>

                    <ButtonGroup name='disable' label='Disable' options='{conditions}' multiple='{true}'>
                        {@item.disable}
                    </ButtonGroup>

                    <ButtonGroup name='setups' label='Setups' options='{setup_options}' multiple='{true}'>
                        {@item.setups}
                    </ButtonGroup>

                    <Dropdown name='action' label='Action' options='{actions}'>{@item.action}</Dropdown>

                    <Dropdown name='condition' label='Condition' options='{@item.condition}'>{data.condition}</Dropdown>
        
                    <Dropdown name='choice' label='Choice' options='{choices}'>{@item.choice}</Dropdown>
        
                    <Dropdown name='token' label='Token' options='{tokens}'>{@item.token}</Dropdown>
        
                    <Dropdown name='group' label='Group' options='{groups}'>{@item.group}</Dropdown>

                    <NumberInput name='amount' label='Amount'>{@item.amount}</NumberInput>
        
                    <Dropdown name='relation' label='Relation' options='{relations}'>{@item.relation}</Dropdown>

                </Form>
            </Group>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data, items,
            relations: composeFromObject(GROUP_RELATION),
            ...composeCommonFormContext(data as GameEntity, ent),
        },
    }, true);

    return result as BaseControl[];


};