import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Source, SOURCE_MODES, SOURCE_PICK, SOURCE_QUOTA } from "@app/game-mechanics";
import { composeEntityOptions, composeFromObject, baseTemplate } from "../helpers";

export const composeSourceForm: FormDefinition = (data: Source, ent?: ConnectedEntities) => {

    data = data || {};
    const keywords = data.keywords || [];

    const template = `
        <Form>
            ${baseTemplate}

            <Dropdown name='mode' label='Mode' options='{mode}'>{data.mode}</Dropdown>

            <Dropdown name='pick' label='Pick' options='{pick}'>{data.pick}</Dropdown>

            <Dropdown name='quota' label='Quota' options='{quota}'>{data.quota}</Dropdown>

            <Dropdown name='group' label='Group' options='{groups}'>{data.group}</Dropdown>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data, keywords,
            mode: composeFromObject(SOURCE_MODES),
            pick: composeFromObject(SOURCE_PICK),
            quota: composeFromObject(SOURCE_QUOTA),
            setup_options: composeEntityOptions(ent, 'setups'),
            images: composeEntityOptions(ent, 'images', ['thumbnail', 'svg']),
            groups: composeEntityOptions(ent, 'groups'),
            keyword_options: composeEntityOptions(ent, 'keywords'),
        },
    }, true);

    return result as BaseControl[];


};