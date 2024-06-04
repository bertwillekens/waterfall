import z from "zod";

// Utility type to make a type keyed
export type Keyed<T> = T extends GenericAction
  ? T & { key: string }
  : T extends Scene
    ? Omit<T, "actions"> & {
        key: string;
        actions: Keyed<Action>[];
      }
    : T extends Scenario
      ? Omit<T, "scenes"> & { scenes: Keyed<Scene>[] }
      : never;

// Action types

export type GenericAction = {
  type: string;
};

export const durationTypeSchema = z.union([
  z.literal("duration"),
  z.literal("speed"),
]);
export type DurationType = z.infer<typeof durationTypeSchema>;

export const animateScrollActionSchema = z.object({
  type: z.literal("animateScroll"),
  y: z.number(),
  durationType: z.union([z.literal("duration"), z.literal("speed")]),
  speed: z.number().optional(),
  duration: z.number().optional(),
});
export type AnimateScrollAction = z.infer<typeof animateScrollActionSchema>;

export const waitForTypeSchema = z.union([
  z.literal("timeout"),
  z.literal("spacebar"),
]);
export type WaitForType = z.infer<typeof waitForTypeSchema>;

export const waitActionSchema = z.object({
  type: z.literal("wait"),
  waitForType: waitForTypeSchema,
  timeoutDuration: z.number().optional(),
});
export type WaitAction = z.infer<typeof waitActionSchema>;

export const actionSchema = z.union([
  animateScrollActionSchema,
  waitActionSchema,
]);
export type Action = z.infer<typeof actionSchema>;

// Actions Array

export const actionsSchema = z.array(actionSchema);
export type Actions = Action[];

// Scene

export const sceneSchema = z.object({
  pageTitle: z.string().optional(),
  url: z.string(),
  actions: actionsSchema,
});
export type Scene = z.infer<typeof sceneSchema>;

// Scenario

export const scenarioSchema = z.object({
  scenes: z.array(sceneSchema),
});
export type Scenario = z.infer<typeof scenarioSchema>;
