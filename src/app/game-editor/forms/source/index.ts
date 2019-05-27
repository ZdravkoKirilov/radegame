import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Source, SOURCE_MODES, SOURCE_PICK, SOURCE_QUOTA, GameEntity } from "@app/game-mechanics";
import { composeFromObject, baseTemplate, composeCommonFormContext } from "../helpers";

export const composeSourceForm: FormDefinition = (data: Source, ent?: ConnectedEntities) => {

    data = data || {};

    const template = `
        <Form>
            ${baseTemplate}

            <Dropdown name='mode' label='Mode' options='{mode}'>{data.mode}</Dropdown>

            <Dropdown name='pick' label='Pick' options='{pick}'>{data.pick}</Dropdown>

            <Dropdown name='quota' label='Quota' options='{quota}'>{data.quota}</Dropdown>

            <Dropdown name='group' label='Group' options='{group_options}'>{data.group}</Dropdown>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data,
            mode: composeFromObject(SOURCE_MODES),
            pick: composeFromObject(SOURCE_PICK),
            quota: composeFromObject(SOURCE_QUOTA),
            ...composeCommonFormContext(data as GameEntity, ent),
        },
    }, true);

    return result as BaseControl[];


};