import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { type Action, type Keyed, type Scenario, type Scene } from "../schema";
import { playAction, playScenario, playScene } from "../playback";
import { useAppVisibility } from "./VisibilityContext";

type PlaybackContextType = {
  isPlaying: boolean;
  currentSceneKey: string | null;
  currentActionKey: string | null;
  playAction: (scene: Keyed<Scene>, action: Keyed<Action>) => Promise<void>;
  playScene: (scene: Keyed<Scene>) => Promise<void>;
  playScenario: (scenario: Keyed<Scenario>) => Promise<void>;
};
const PlaybackContext = createContext<PlaybackContextType | null>(null);

export function usePlayback() {
  const context = useContext(PlaybackContext);
  if (!context) {
    throw new Error("usePlayback must be used within a PlaybackProvider");
  }
  return context;
}

export function PlaybackProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSceneKey, setCurrentSceneKey] = useState<string | null>(null);
  const [currentActionKey, setCurrentActionKey] = useState<string | null>(null);

  const { hide, expand } = useAppVisibility();

  const onPlayAction = useCallback(
    async (scene: Keyed<Scene>, action: Keyed<Action>) => {
      hide(false);
      setIsPlaying(true);
      setCurrentSceneKey(scene.key);
      setCurrentActionKey(action.key);
      await playAction(action);
      setCurrentSceneKey(null);
      setCurrentActionKey(null);
      setIsPlaying(false);
      expand();
    },
    [],
  );

  const onPlayScene = useCallback(async (scene: Keyed<Scene>) => {
    hide(false);
    setIsPlaying(true);
    setCurrentSceneKey(scene.key);
    setCurrentActionKey(null);
    await playScene(scene, (action) => {
      setCurrentActionKey(action?.key ?? null);
    });
    setCurrentSceneKey(null);
    setCurrentActionKey(null);
    setIsPlaying(false);
    expand();
  }, []);

  const onPlayScenario = useCallback(async (scenario: Keyed<Scenario>) => {
    hide(false);
    setIsPlaying(true);
    await playScenario(scenario, (scene, action) => {
      setCurrentSceneKey(scene?.key ?? null);
      setCurrentActionKey(action?.key ?? null);
    });
    setIsPlaying(false);
    expand();
  }, []);

  const value = useMemo(
    () => ({
      isPlaying,
      currentSceneKey,
      currentActionKey,
      playAction: onPlayAction,
      playScene: onPlayScene,
      playScenario: onPlayScenario,
    }),
    [
      isPlaying,
      currentSceneKey,
      currentActionKey,
      onPlayAction,
      onPlayScene,
      onPlayScenario,
    ],
  );

  return (
    <PlaybackContext.Provider value={value}>
      {children}
    </PlaybackContext.Provider>
  );
}
