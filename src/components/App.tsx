import React, { useEffect } from "react";
import { type Scene, type Scenario, type Keyed } from "../schema";
import SceneEditor from "./views/SceneEditor";
import { makeKeyed } from "../makeKeyed";
import { ScenarioEditor } from "./views/ScenarioEditor";
import { PlaybackProvider } from "./PlaybackContext";
import { deserializeScenario, serializeScenario } from "../serialization";
import CodeInputScreen from "./views/CodeInputScreen";
import { ExpandButton } from "./layout/ExpandButton";
import { AppVisibilityProvider } from "./VisibilityContext";
import { ShortcutHint } from "./layout/ShortcutHint";

const LOCALSTORAGE_KEY = "dt-scenario";

const DEFAULT_DATA: Keyed<Scenario> = makeKeyed({
  scenes: [],
});

const App: React.FC = () => {
  //Get initial scenario from local storage or default
  const initialScenarioJson = localStorage.getItem(LOCALSTORAGE_KEY);
  const result = deserializeScenario(initialScenarioJson || "{}");
  const initialScenario = result.success ? result.data : DEFAULT_DATA;

  const [demo, setDemo] = React.useState<Keyed<Scenario>>(initialScenario);

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_KEY, serializeScenario(demo));
  }, [demo]);

  //Navigation
  const [currentView, setCurrentView] = React.useState<
    "scenario" | "scene" | "io"
  >("scenario");

  const [currentSceneKey, setCurrentSceneKey] = React.useState<string | null>(
    null,
  );

  const currentScene =
    currentSceneKey && demo.scenes.find((p) => p.key === currentSceneKey);

  const goToIndex = () => {
    setCurrentView("scenario");
    setCurrentSceneKey(null);
  };

  const goToScene = (key: string) => {
    setCurrentView("scene");
    setCurrentSceneKey(key);
  };

  const goToIo = () => {
    setCurrentView("io");
  };

  // Update
  const updateScene = (key: string, newScene: Keyed<Scene>) => {
    setDemo({
      ...demo,
      scenes: demo.scenes.map((i) => (i.key === key ? newScene : i)),
    });
  };

  return (
    <div tw="font-sans">
      <AppVisibilityProvider>
        {({
          visibility,
          expand,
          hide,
          shortcutHintShowing: shortcutNoticeShowing,
        }) => (
          <PlaybackProvider>
            {shortcutNoticeShowing && (
              <div tw="z-app fixed bottom-4 right-4">
                <ShortcutHint />
              </div>
            )}
            {visibility === "collapsed" && (
              <div tw="z-app fixed bottom-4 right-4">
                <ExpandButton onClick={expand} onHideClick={hide} />
              </div>
            )}
            {visibility === "open" && (
              <div tw="z-app pointer-events-none fixed bottom-0 right-0 top-0 flex w-full max-w-md flex-col justify-end p-4">
                <div tw="pointer-events-auto flex max-h-full flex-col overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5">
                  {currentView === "scene" && currentScene ? (
                    <SceneEditor
                      value={currentScene}
                      sceneIndex={demo.scenes.indexOf(currentScene)}
                      onChange={(scene) => {
                        updateScene(currentScene.key, scene);
                      }}
                      onBack={goToIndex}
                    />
                  ) : currentView === "io" ? (
                    <CodeInputScreen
                      value={demo}
                      onChange={setDemo}
                      onBack={goToIndex}
                    />
                  ) : (
                    <ScenarioEditor
                      demo={demo}
                      goToScene={goToScene}
                      onChange={setDemo}
                      goToIo={goToIo}
                    />
                  )}
                </div>
              </div>
            )}
          </PlaybackProvider>
        )}
      </AppVisibilityProvider>
    </div>
  );
};

export default App;
