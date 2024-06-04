import { type Scenario, type Keyed, scenarioSchema } from "./schema";
import yaml from "js-yaml";
import { makeKeyed, stripKeys } from "./makeKeyed";

//Controller component that
export function serializeScenario(scenario: Keyed<Scenario>): string {
  return yaml.dump(stripKeys(scenario));
}
export function deserializeScenario(data: string):
  | {
      success: true;
      data: Keyed<Scenario>;
    }
  | {
      success: false;
    } {
  try {
    const parsedValue = yaml.load(data);
    const zodParseResult = scenarioSchema.safeParse(parsedValue);
    if (zodParseResult.success) {
      return { success: true, data: makeKeyed(zodParseResult.data) };
    } else {
      return { success: false };
    }
  } catch (e) {
    console.error(e);
    return { success: false };
  }
}
