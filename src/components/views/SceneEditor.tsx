import React from "react";
import {
  type Keyed,
  type Scene,
  type AnimateScrollAction,
  type Action,
  type WaitAction,
} from "../../schema";
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
  IoPlayOutline,
  IoTrashBinOutline,
} from "react-icons/io5";
import { Card } from "../layout/Card";
import { ScrollToActionEditor } from "./actions/ScrollToActionEditor";
import { WaitForPageActionEditor } from "./actions/WaitForPageActionEditor";
import ViewSkeleton from "../layout/ViewSkeleton";
import { WaitActionEditor } from "./actions/WaitActionEditor";
import { usePlayback } from "../PlaybackContext";

export interface SceneEditorProps {
  value: Keyed<Scene>;
  sceneIndex: number;
  onChange: (value: Keyed<Scene>) => void;
  onBack: () => void;
}

export default function SceneEditor({
  value,
  sceneIndex,
  onChange,
  onBack,
}: SceneEditorProps) {
  const { playAction, playScene, isPlaying, currentActionKey } = usePlayback();

  const updateAction = (index: number, newAction: Keyed<Action>) => {
    onChange({
      ...value,
      actions: value.actions.map((i, iIndex) =>
        iIndex === index ? newAction : i,
      ),
    });
  };

  const addAction = <TAction extends Keyed<Action>>(action: TAction) => {
    onChange({
      ...value,
      actions: [...value.actions, action],
    });
  };

  const addAnimateScrollAction = () => {
    addAction<Keyed<AnimateScrollAction>>({
      key: uniqid(),
      type: "animateScroll",
      y: window.scrollY,
      durationType: "speed",
    });
  };

  const addWaitAction = () => {
    addAction<Keyed<WaitAction>>({
      key: uniqid(),
      type: "wait",
      waitForType: "timeout",
    });
  };

  const onDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) {
      return;
    }

    const newActions = Array.from(value.actions);
    const [removed] = newActions.splice(result.source.index, 1);
    newActions.splice(result.destination.index, 0, removed);

    onChange({
      ...value,
      actions: newActions,
    });
  };

  const onDeleteAction = (index: number) => {
    onChange({
      ...value,
      actions: value.actions.filter((_, i) => i !== index),
    });
  };

  const onPlayAction = (index: number) => {
    const action = value.actions[index];
    playAction(value, action);
  };

  const onPlayScene = async () => {
    playScene(value);
  };

  const onClearAll = () => {
    onChange({
      ...value,
      actions: [],
    });
  };

  return (
    <ViewSkeleton
      superTitle={`Scene #${sceneIndex + 1}`}
      title={value.pageTitle}
      onBack={onBack}
      forehead={
        <>
          <div tw="flex flex-row justify-center gap-3">
            <Button onClick={onPlayScene} disabled={isPlaying}>
              <IoPlayOutline tw="h-4 w-4" />
              Play scene
            </Button>
            <Button onClick={onClearAll}>
              <IoTrashBinOutline tw="h-4 w-4" />
              Clear all
            </Button>
          </div>
        </>
      }
      chin={
        <>
          <div tw="flex gap-3">
            <Button onClick={addAnimateScrollAction}>
              <IoAddOutline tw="h-4 w-4" />
              Animate scroll
            </Button>
            <Button onClick={addWaitAction}>
              <IoAddOutline tw="h-4 w-4" />
              Wait
            </Button>
          </div>
        </>
      }
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <div tw="bg-slate-200 p-4 pb-0">
          <div tw="pb-4">
            <WaitForPageActionEditor scene={value} onChange={onChange} />
          </div>
          <Droppable droppableId="actions">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {value.actions.map((action, index) => {
                  const isCurrentlyPlaying =
                    isPlaying && currentActionKey === action.key;

                  return (
                    <Draggable
                      draggableId={action.key}
                      index={index}
                      key={action.key}
                    >
                      {(provided) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            tw="pb-4"
                          >
                            <div {...provided.dragHandleProps}>
                              {action.type === "animateScroll" ? (
                                <ScrollToActionEditor
                                  key={index}
                                  action={action}
                                  onChange={(newAction) => {
                                    updateAction(index, newAction);
                                  }}
                                  onDelete={() => onDeleteAction(index)}
                                  onPlay={() => onPlayAction(index)}
                                  disablePlay={isPlaying}
                                  isPlaying={isCurrentlyPlaying}
                                />
                              ) : action.type === "wait" ? (
                                <WaitActionEditor
                                  key={index}
                                  action={action}
                                  onChange={(newAction) => {
                                    updateAction(index, newAction);
                                  }}
                                  onDelete={() => onDeleteAction(index)}
                                  onPlay={() => onPlayAction(index)}
                                  disablePlay={isPlaying}
                                  isPlaying={isCurrentlyPlaying}
                                />
                              ) : (
                                <Card></Card>
                              )}
                            </div>
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
