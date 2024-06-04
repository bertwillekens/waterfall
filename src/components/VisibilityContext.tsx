import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import hotkeys from "hotkeys-js";

type AppVisibilityContextType = {
  visibility: "open" | "collapsed" | "hidden";
  shortcutHintShowing: boolean;
  expand: () => void;
  collapse: () => void;
  hide: (showHotkeyHint?: boolean) => void;
};
const AppVisibilityContext = createContext<AppVisibilityContextType | null>(
  null,
);

export function useAppVisibility() {
  const context = useContext(AppVisibilityContext);
  if (!context) {
    throw new Error(
      "useAppVisibility must be used within a AppVisibilityProvider",
    );
  }
  return context;
}

export function AppVisibilityProvider({
  children,
}: {
  children:
    | React.ReactNode
    | ((props: AppVisibilityContextType) => React.ReactNode);
}) {
  const [visibility, setVisibility] = React.useState<
    "open" | "collapsed" | "hidden"
  >("collapsed");

  const [shortcutHintShowing, setShortcutHintShowing] =
    React.useState<boolean>(false);
  const [shortcutHintTimeoutId, setShortcutHintTimeoutId] =
    React.useState<ReturnType<typeof setTimeout> | null>();

  const hideShortcutHint = useCallback(() => {
    if (shortcutHintTimeoutId) {
      clearTimeout(shortcutHintTimeoutId);
    }
    setShortcutHintShowing(false);
  }, [shortcutHintTimeoutId, setShortcutHintShowing]);

  const showShortcutHint = useCallback(() => {
    hideShortcutHint();
    setShortcutHintShowing(true);
    setShortcutHintTimeoutId(
      setTimeout(() => {
        setShortcutHintShowing(false);
      }, 3000),
    );
  }, [hideShortcutHint]);

  const expand = useCallback(() => {
    hideShortcutHint();
    setVisibility("open");
  }, []);
  const collapse = useCallback(() => {
    hideShortcutHint();
    setVisibility("collapsed");
  }, []);
  const hide = useCallback((showHotkeyHint: boolean = true) => {
    setVisibility("hidden");
    if (showHotkeyHint) {
      showShortcutHint();
    } else {
      hideShortcutHint();
    }
  }, []);

  const toggleHidden = useCallback(() => {
    if (visibility === "hidden") {
      expand();
    } else {
      hide(false);
    }
  }, [visibility, expand, hide]);

  const toggleHiddenHotKey = "alt+d";

  hotkeys.filter = () => true;

  useEffect(() => {
    hotkeys(toggleHiddenHotKey, (e) => {
      e.preventDefault();
      toggleHidden();
    });
    return () => {
      hotkeys.unbind(toggleHiddenHotKey);
    };
  }, [toggleHiddenHotKey, toggleHidden]);

  const value = useMemo(
    () => ({
      visibility,
      shortcutHintShowing,
      expand,
      collapse,
      hide,
    }),
    [visibility, shortcutHintShowing, expand, collapse, hide],
  );

  return (
    <AppVisibilityContext.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </AppVisibilityContext.Provider>
  );
}
