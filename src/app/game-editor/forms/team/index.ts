import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Team } from "@app/game-mechanics";
import { baseTemplate, boardTemplate, composeCommonFormContext } from "../helpers";

export const composeTeamForm: FormDefinition = (data: Team, ent: ConnectedEntities): BaseControl[] => {
    data = data || {};
    const keywords = data.keywords || [];

    const template = `
    <Form>

        ${baseTemplate}

        ${boardTemplate}

    </Form>
   `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            data, keywords,
        }
    }, true) as BaseControl[];

    return result;
};