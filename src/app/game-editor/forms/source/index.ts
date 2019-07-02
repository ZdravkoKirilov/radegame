import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Source, SOURCE_PICK, SOURCE_QUOTA, GameEntity } from "@app/game-mechanics";
import { composeFromObject, baseTemplate, composeCommonFormContext } from "../helpers";

export const composeSourceForm: FormDefinition = (data: Source, ent?: ConnectedEntities) => {

    data = data || {};

    const template = `
        <Form>
            ${baseTemplate}

            <Dropdown name='pick' label='Pick' options='{pick}'>{data.pick}</Dropdown>

            <Dropdown name='quota' label='Quota' options='{quota}'>{data.quota}</Dropdown>

            <Dropdown name='group' label='Group' options='{group_options}'>{data.group}</Dropdown>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data as GameEntity, ent),
            data,
            pick: composeFromObject(SOURCE_PICK),
            quota: composeFromObject(SOURCE_QUOTA),
        },
    }, true);

    return result as BaseControl[];
};