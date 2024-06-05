import React from "react";
import { type Scenario, type Keyed } from "../../schema";
import { Card } from "../layout/Card";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type OnDragEndResponder,
} from "react-beautiful-dnd";
import uniqid from "uniqid";
import Button from "../layout/Button";
import {
  IoAddOutline,
  IoCodeSlashOutline,
  IoPlayOutline,
  IoTrashBinOutline,
} from "react-icons/io5";
import ViewSkeleton from "../layout/ViewSkeleton";
import { usePlayback } from "../PlaybackContext";

export function ScenarioEditor({
  demo,
  goToScene,
  onChange,
  goToIo,
}: {
  demo: Keyed<Scenario>;
  goToScene: (key: string) => void;
  onChange: (value: Keyed<Scenario>) => void;
  goToIo: () => void;
}) {
  // const updateScene = (
  //   index: number,
  //   newAction: Keyed<ScrollToAction>,
  // ) => {
  //   onChange({
  //     ...demo,
  //     scenes: value.actions.map((i, iIndex) =>
  //       iIndex === index ? newAction : i,
  //     ),
  //   });
  // };
  const addScene = () => {
    onChange({
      ...demo,
      scenes: [
        ...demo.scenes,
        {
          key: uniqid(),
          url: document.location.href,
          pageTitle: document.title,
          actions: [],
        },
      ],
    });
  };

  const onDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) {
      return;
    }

    const newScenes = Array.from(demo.scenes);
    const [removed] = newScenes.splice(result.source.index, 1);
    newScenes.splice(result.destination.index, 0, removed);

    onChange({
      ...demo,
      scenes: newScenes,
    });
  };

  const onDeleteScene = (index: number) => {
    onChange({
      ...demo,
      scenes: demo.scenes.filter((_, i) => i !== index),
    });
  };

  const onClearAll = () => {
    onChange({
      ...demo,
      scenes: [],
    });
  };

  const { playScenario } = usePlayback();

  const onPlayScenario = () => {
    playScenario(demo);
  };

  return (
    <ViewSkeleton
      title="Scenario"
      forehead={
        <>
          <div tw="flex flex-row justify-center gap-3">
            <Button onClick={onPlayScenario}>
              <IoPlayOutline tw="h-4 w-4" />
              Play scenario
            </Button>
            <Button onClick={goToIo}>
              <IoCodeSlashOutline tw="h-4 w-4" />
              YAML I/O
            </Button>
            <Button onClick={onClearAll}>
              <IoTrashBinOutline tw="h-4 w-4" />
              Clear all
            </Button>
          </div>
        </>
      }
      chin={
        <Button onClick={addScene}>
          <IoAddOutline tw="h-4 w-4" /> Scene
        </Button>
      }
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <div tw="bg-slate-200 p-4 pb-0">
          <Droppable droppableId="scenes">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {demo.scenes.map((scene, index) => {
                  return (
                    <Draggable
                      draggableId={scene.key}
                      index={index}
                      key={scene.key}
                    >
                      {(provided) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            tw="pb-4"
                          >
                            <Card
                              onClick={() => goToScene(scene.key)}
                              key={scene.key}
                              headerContent={
                                <div tw="flex flex-row items-start justify-between gap-3">
                                  <div tw="shrink grow overflow-hidden">
                                    <div tw="overflow-hidden text-ellipsis whitespace-nowrap text-xs uppercase tracking-wide text-slate-500">
                                      Scene #{index + 1}
                                    </div>
                                    <div
                                      tw="mt-2 overflow-hidden text-ellipsis whitespace-nowrap"
                                      title={scene.pageTitle}
                                    >
                                      {scene.pageTitle}
                                    </div>
                                    <div
                                      tw="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-slate-500"
                                      title={scene.url}
                                    >
                                      {scene.url}
                                    </div>
                                  </div>
                                  <div tw="flex flex-row justify-between gap-3">
                                    {onDeleteScene && (
                                      <button
                                        aria-label="Delete"
                                        title="Delete"
                                      >
                                        <IoTrashBinOutline
                                          tw="h-5 w-5"
                                          onClick={() => {
                                            onDeleteScene(index);
                                          }}
                                        />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              }
                            ></Card>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </ViewSkeleton>
  );
}
