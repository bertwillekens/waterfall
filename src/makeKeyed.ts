import { type Scenario, type Keyed } from "./schema";
import uniqid from "uniqid";

export function makeKeyed(demo: Scenario): Keyed<Scenario> {
  return {
    ...demo,
    scenes: demo.scenes.map((scene) => {
      return {
        key: uniqid(),
        ...scene,
        actions: scene.actions.map((action) => {
          return {
            key: uniqid(),
            ...action,
          };
        }),
      };
    }),
  };
}

export function stripKeys(demo: Keyed<Scenario>): Scenario {
  return {
    ...demo,
    scenes: demo.scenes.map((scene) => {
      const { key, ...rest } = scene;
      return {
        ...rest,
        actions: scene.actions.map((action) => {
          const { key, ...rest } = action;
          return {
            ...rest,
          };
        }),
      };
    }),
  };
}
