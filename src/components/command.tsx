"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { For } from "million/react";
import { filter, groupBy, pipe, set } from "remeda";
import { objectEntries } from "@antfu/utils";

type Action = {
  icon: (props: any) => JSX.Element;
  disabled?: boolean;
  title: string;
  category?: string;
  hotkeys?: string[];
  run: (control: Control) => void | Promise<void>;
};

type Control = ReturnType<typeof useControl>;
type ActionProvider = (filter: string, global: boolean) => Promise<Action[]>;

function useControl() {
  console.log("use control");
  const providers = new Map<string, ActionProvider>();
  const [visible, setVisible] = useState<boolean>(false);
  const [actions, setActions] = useState<Action[]>([]);
  const [input, setInput] = useState<string>("");
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  //   TODO: make this use refs, copied this pretty liberally from sst console. i kind of love how it works though

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const control = useMemo(() => {
    return {
      get root() {
        const r = root;
        if (!r) throw new Error("Root not set");
        return r;
      },
      active() {
        return control.root.querySelector(
          "[data-element='action'].active"
        ) as HTMLElement;
      },
      actions() {
        return [...control.root.querySelectorAll("[data-element='action']")];
      },
      setActive(el: HTMLElement, disableScroll = false) {
        if (!el) return;
        const current = control.active();
        if (current) current.classList.remove("active");
        el.classList.add("active");
        if (!disableScroll) {
          const index = control.actions().indexOf(el);
          if (index === 0) {
            el.scrollIntoView({
              block: "end",
            });
            return;
          }

          el.scrollIntoView({
            block: "nearest",
          });
        }
      },
    };
  }, [root]);

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        show();
        console.log("showing");
      }

      if (!visible) return;

      if (e.key === "Enter") {
        e.preventDefault();
        e.stopImmediatePropagation();
        // LOL YOLO
        const current = control.active();
        if (current) current.click();
      }
    }
    document.addEventListener("keydown", onKeydown);

    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, [control, visible]);

  const groups = useMemo(() => {
    return pipe(
      actions || [],
      filter(
        (action) =>
          action.title.toLowerCase().includes(input.toLowerCase()) ||
          Boolean(action.category?.toLowerCase().includes(input.toLowerCase()))
      ),
      filter((action) => !action.disabled),
      groupBy((a) => a.category)
    );
  }, [actions, input]);

  const show = useCallback(() => {
    setVisible(true);
    // setInput("");
  }, []);

  return {
    bind: setRoot,
    input,
    setInput,
    register(name: string, provider: ActionProvider) {
      providers.set(name, provider);
    },
    unregister(name: string) {
      providers.delete(name);
    },
    show,
    visible,
    groups,
    isTyping,
    setActive: control.setActive,
    setVisible,
    // hide
  };
}

export const CommandBarContext = createContext<Control | null>(null);

export function CommandBar({ children }: { children: React.ReactNode }) {
  const control = useControl();

  console.log("rendering command bar");
  let scrollingTimeout: number | null = null;
  const body = document.querySelector("body");
  return (
    <CommandBarContext.Provider value={control}>
      {children}
      <Dialog.Root
        open={control.visible}
        onOpenChange={(open) => {
          if (open === control.visible) return;
          control.setVisible(open);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content
            ref={control.bind}
            className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-xl animate-in fade-in translate-x-[-50%] translate-y-[-50%] gap-4 border bg-slate-900/90 backdrop-blur-md p-6 shadow-lg rounded-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] "
          >
            <Filter input={control.input} setInput={control.setInput} />
            {/* TODO: get rid of scrollbar */}
            <div
              className="border-t border-white/[8] max-h-80 p-2 overflow-y-auto empty:hidden"
              data-element="results"
              onScroll={() => {
                if (scrollingTimeout) window.clearTimeout(scrollingTimeout);
                scrollingTimeout = window.setTimeout(() => {
                  scrollingTimeout = null;
                }, 100);
              }}
            >
              {/*  */}
              <For memo each={objectEntries(control.groups)}>
                {([category, actions]) => (
                  <>
                    <div className="flex py-2 px-3 uppercase text-sm items-center font-bold text-slate-50/50">
                      {category.toString()}
                    </div>
                    <For each={actions}>
                      {(action) => (
                        // biome-ignore lint/a11y/useKeyWithClickEvents: this is fine
                        // biome-ignore lint/a11y/useKeyWithMouseEvents: this is also fine
                        <div
                          data-element="action"
                          onClick={() => {
                            action.run(control);
                          }}
                          onMouseOver={(e) => {
                            const target = e.currentTarget;
                            if (control.isTyping) return;
                            setTimeout(() => {
                              // if (control.isScrolling) return;
                              if (scrollingTimeout) return;
                              control.setActive(target, true);
                            }, 0);
                          }}
                          className="flex gap-1 py-0 px-3 h-12 items-center rounded text-base"
                        >
                          <div className="grow-0 shrink-0 basis-auto w-4 h-4">
                            <action.icon />
                          </div>
                          <span className="truncate text-slate-50/80 leading-normal">
                            {action.title}
                          </span>
                        </div>
                      )}
                    </For>
                  </>
                )}
              </For>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </CommandBarContext.Provider>
  );
}

function Filter({
  input,
  setInput,
}: {
  input: string;
  setInput: (value: string) => void;
}) {
  return (
    <div className="flex py-4 px-5">
      <input
        type="text"
        className="grow border-0 bg-transparent"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search"
      />
    </div>
  );
}
