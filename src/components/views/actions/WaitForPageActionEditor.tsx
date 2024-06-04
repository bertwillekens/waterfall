import React from "react";
import { type Keyed, type Scene } from "../../../schema";
import Input from "../../form/Input";
import Button from "../../layout/Button";
import { FormLockup } from "../../form/FormLockup";
import { ActionCard } from "./ActionCard";
import { IoLockClosedOutline } from "react-icons/io5";

export function WaitForPageActionEditor({
  scene,
  onChange,
}: {
  scene: Keyed<Scene>;
  onChange: (scene: Keyed<Scene>) => void;
}) {
  const setToCurrentPage = () => {
    onChange({
      ...scene,
      url: window.location.href,
      pageTitle: document.title,
    });
  };
  return (
    <ActionCard
      title="Wait for page"
      buttons={
        <>
          <Button onClick={setToCurrentPage} size="sm">
            Set current page
          </Button>
          <IoLockClosedOutline className="dt-h-5 dt-w-5 dt-text-slate-500" />
        </>
      }
      locked={true}
    >
      <FormLockup>
        <Input
          labelText={"Page URL"}
          type="url"
          value={scene.url}
          onChange={(e) => onChange({ ...scene, url: e.target.value })}
        />
        <Input
          labelText={"Page Title"}
          type="text"
          value={scene.pageTitle}
          onChange={(e) =>
            onChange({
              ...scene,
              pageTitle: e.target.value,
            })
          }
        />
      </FormLockup>
    </ActionCard>
  );
}
