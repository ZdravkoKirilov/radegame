import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { PathEntity } from "@app/game-mechanics";
import { composeLocationOptions } from "../helpers";

export const composePathForm: FormDefinition = (data: PathEntity, ent?: ConnectedEntities) => {

    data = data || {};

    const template = `
        <Form>
            <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>
            <NumberInput name='game' hidden='{true}'>{data.game}</NumberInput>
            <NumberInput name='stage' hidden='{true}'>{data.stage}</NumberInput>
            
            <Dropdown name='from_loc' label='From' options='{locations}' showImage='{true}'>{data.from_loc}</Dropdown>
            <Dropdown name='to_loc' label='To' options='{locations}' showImage='{true}'>{data.to_loc}</Dropdown>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data,
            locations: composeLocationOptions(ent),
        },
    }, true);

    return result as BaseControl[];


};