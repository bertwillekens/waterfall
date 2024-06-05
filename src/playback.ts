import {
  type Keyed,
  type Action,
  type AnimateScrollAction,
  type Scenario,
  type Scene,
  type WaitAction,
} from "./schema";

import { gsap } from "gsap";

import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export const DEFAULT_WAIT_TIMEOUT_DURATION = 1500;

export async function waitForPage(scene: Scene) {
  console.info("[START] waitForPage", scene.url);
  return new Promise<void>((resolve) => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    const listener = () => {
      if (document.location.href === scene.url) {
        console.info("[FINISH] waitForPage", scene.url);
        if (intervalId) {
          clearInterval(intervalId);
        }
        window.removeEventListener("load", listener);
        window.removeEventListener("popstate", listener);
        resolve();
      }
    };
    window.addEventListener("load", listener);
    window.addEventListener("popstate", listener);
    intervalId = setInterval(listener, 200);
    listener();
  });
}

export const DEFAULT_ANIMATE_SCROLL_DURATION = 1500;
export const DEFAULT_ANIMATE_SCROLL_SPEED = 1000;

async function playAnimateScroll(action: AnimateScrollAction) {
  console.info("[START] animateScroll", action);
  return new Promise<void>((resolve) => {
    let durationMs: number;

    if (action.durationType === "duration") {
      durationMs = action.duration || DEFAULT_ANIMATE_SCROLL_DURATION;
    } else if (action.durationType === "speed") {
      const currentY = window.scrollY;
      const distance = Math.abs(action.y - currentY);
      const speed = action.speed || DEFAULT_ANIMATE_SCROLL_SPEED;
      durationMs = (distance / speed) * 1000;
    } else {
      throw new Error(`Unknown durationType: ${action.durationType}`);
    }

    console.info("duration", durationMs);

    gsap.to(window, {
      scrollTo: action.y,
      duration: durationMs / 1000,
      onComplete: () => {
        console.info("[FINISH] animateScroll", action);
        resolve();
      },
    });
  });
}

async function playWait(action: WaitAction) {
  console.info("[START] wait", action);
  if (action.waitForType === "timeout") {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.info("[FINISH] wait", action);
        resolve();
      }, action.timeoutDuration || DEFAULT_WAIT_TIMEOUT_DURATION);
    });
  }

  if (action.waitForType === "spacebar") {
    return new Promise<void>((resolve) => {
      const listener = (e: KeyboardEvent) => {
        if (e.key === " ") {
          window.removeEventListener("keydown", listener);
          console.info("[FINISH] wait", action);
          resolve();
        }
      };
      window.addEventListener("keydown", listener);
    });
  }

  throw new Error(`Unknown waitForType: ${action.waitForType}`);
}

export async function playAction(action: Action) {
  switch (action.type) {
    case "animateScroll":
      return playAnimateScroll(action);
    case "wait":
      return playWait(action);
    default:
      return Promise.resolve();
  }
}

export async function playScene(
  scene: Keyed<Scene>,
  onPlaybackChange?: (action: Keyed<Action> | null) => void,
) {
  console.info("[START] playScene", scene.url);
  await waitForPage(scene);
  for (const action of scene.actions) {
    onPlaybackChange?.(action);
    await playAction(action);
  }
  onPlaybackChange?.(null);
  console.info("[FINISH] playScene", scene.url);
}

export async function playScenario(
  scenario: Keyed<Scenario>,
  onPlaybackChange?: (
    scene: Keyed<Scene> | null,
    action: Keyed<Action> | null,
  ) => void,
) {
  console.info("[START] playScenario");
  for (const scene of scenario.scenes) {
    onPlaybackChange?.(scene, null);
    await playScene(scene, (action) => {
      onPlaybackChange?.(scene, action);
    });
  }
  onPlaybackChange?.(null, null);
  console.info("[FINISH] playScenario");
}
