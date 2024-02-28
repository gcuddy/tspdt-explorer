"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { filter, groupBy, pipe } from "remeda";
import { usePathname, useRouter } from "next/navigation";

import { ArrowElbowDownRight } from "@phosphor-icons/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useQuery } from "@tanstack/react-query";
import { getMovies, searchDirector } from "@/server/data-layer";

type Action = {
    icon: (props: any) => React.ReactNode;
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
    const [activeProviders,] = useState<string[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [actions, setActions] = useState<Action[]>([]);
    const [input, setInput] = useState<string>("");
    const [root, setRoot] = useState<HTMLElement | null>(null);
    let isTyping = false;

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
                return [
                    ...control.root.querySelectorAll("[data-element='action']"),
                ] as HTMLElement[];
            },
            reset() {
                control.setActive(control.actions()[0]);
            },
            setActive(el: HTMLElement, disableScroll = false) {
                if (!el) return;
                const current = control.active();
                if (current) {
                    current.classList.remove("active");
                    current.removeAttribute("data-active");
                }
                el.classList.add("active");
                el.dataset.active = "true";
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
            move(direction: -1 | 1) {
                const current = control.active();
                const all = control.actions();
                if (!current) {
                    control.setActive(all[0]);
                    return;
                }
                const index = all.indexOf(current);
                const next = all[index + direction];
                control.setActive(next ?? all[direction === 1 ? 0 : all.length - 1]);
            },
            next() {
                return control.move(1);
            },
            back() {
                return control.move(-1);
            },
        };
    }, [root]);

    useEffect(() => {
        if (!visible) return;

        async function runEffect() {
            console.log("running effect");
            const p = activeProviders.length
                ? activeProviders.map((p) => providers.get(p)).filter(Boolean)
                : [...providers.values()].reverse();

            const actions = await Promise.all(
                p.map(async (provider) => {
                    const actions = await provider(input, activeProviders.length === 0);
                    return actions;
                })
            ).then((x) => x.flat());

            setActions(actions);
        }

        runEffect();
    }, [visible]);

    useEffect(() => {
        const el = root?.querySelector(`[data-element="results"]`)!;

        if (!el) return;

        const observer = new MutationObserver(() => {
            console.log("mutation");
            control.reset();
            //   const active = control.active();
            //   if (!active) return;
            //   active.scrollIntoView({
            //     block: "nearest",
            //   });
        });

        observer.observe(el, { childList: true });

        return () => observer.disconnect();
    }, [root, control]);

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

    useEffect(() => {
        function onKeydown(e: KeyboardEvent) {
            if (!visible) return;
            if (e.key === "ArrowDown") {
                e.preventDefault();
                e.stopImmediatePropagation();
                control.next();
            }

            if (e.key === "ArrowUp") {
                e.preventDefault();
                e.stopImmediatePropagation();
                control.back();
            }
        }
        document.addEventListener("keydown", onKeydown);

        return () => {
            document.removeEventListener("keydown", onKeydown);
        };
    }, [control, visible]);

    const groups = useMemo(() => {
        console.log("groups", { actions, input });
        const grouped = pipe(
            actions || [],
            filter(
                (action) =>
                    action.title.toLowerCase().includes(input.toLowerCase()) ||
                    Boolean(action.category?.toLowerCase().includes(input.toLowerCase()))
            ),
            filter(() => {
                return true;
            }),
            filter(() => {
                // console.log("action", action);
                return true;
            }),
            filter((action) => !action.disabled),
            groupBy((a) => a.category)
        );
        console.log("grouped", grouped);
        return grouped;
    }, [input, actions]);

    const show = useCallback(() => {
        setVisible(true);
        setInput("");
    }, []);

    const hide = useCallback(() => {
        setVisible(false);
    }, []);

    return {
        bind: setRoot,
        root,
        input,
        setInput,
        register(name: string, provider: ActionProvider) {
            providers.set(name, provider);
        },
        hide,
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
function useDirectors(_search: string = "") {
    return useQuery(
        {
            queryKey: ["directors", _search],
            queryFn: async () => {
                return searchDirector(_search);
            },
        }
    )
}

export function useMovies() {
    return useQuery(
        {
            queryKey: ["movies"],
            queryFn: async () => {
                return getMovies();
            },
        }
    )
}
export const CommandBarContext = createContext<Control | null>(null);

export function CommandBar({ children }: { children: React.ReactNode }) {
    const control = useControl();

    const directors = useDirectors();
    const movies = useMovies();

    console.log("rendering command bar");
    let scrollingTimeout: number | null = null;

    const router = useRouter();
    const pathname = usePathname();
    // globals
    control.register("global", async () => {
        return [
            NavigationAction({
                title: "Home",
                category: "Navigation",
                path: "/",
                disabled: false,
                router,
                pathname,
            }),
        ];
    });

    useEffect(() => {
        if (directors.data) control.register("directors", async () => {
            return directors.data.map((director) =>
                NavigationAction({
                    title: director.name ?? "Unknown",
                    category: "Directors",
                    path: `/director/${director.id}`,
                    disabled: false,
                    router,
                    pathname,
                })
            );
        });

        if (movies.data) control.register("movies", async () => {
            return movies.data.map((movie) =>
                NavigationAction({
                    title: `${movie.title} (${movie.year})` ?? "Unknown",
                    category: "Movies",
                    path: `/movie/${movie.id}`,
                    disabled: false,
                    router,
                    pathname,
                })
            );
        });
    }, [directors, movies]);


    console.log({ movies });


    // get count of all actions
    const mappedActions = useMemo(() => {
        const actions: Array<Action | string> = [];
        for (const key in control.groups) {
            actions.push(key);
            actions.push(...control.groups[key]);
        }
        return actions;
    }, [control.groups]);

    const scrollRef = useRef<HTMLDivElement>(null);

    const virtualizer = useVirtualizer({
        count: mappedActions.length,
        getScrollElement: () => scrollRef.current,
        estimateSize: () => 40,
        overscan: 10,
    });

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
                    <Dialog.Overlay className="fixed inset-0 z-50 bg-black/10 backdrop-blur-[2px] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                    <Dialog.Content
                        ref={control.bind}
                        className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl animate-in fade-in ring-1 ring-black/10 translate-x-[-50%] translate-y-[-50%] gap-4 bg-black/90 backdrop-blur-md p-6 shadow-lg rounded-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] "
                    >
                        <Filter input={control.input} setInput={control.setInput} />
                        {/* TODO: get rid of scrollbar */}
                        <div
                            className="border-t border-white/[.08] max-h-80 p-2 overflow-y-auto empty:hidden"
                            data-element="results"
                            ref={scrollRef}
                            onScroll={() => {
                                if (scrollingTimeout) window.clearTimeout(scrollingTimeout);
                                scrollingTimeout = window.setTimeout(() => {
                                    scrollingTimeout = null;
                                }, 100);
                            }}
                            style={{
                                height: "400px",
                            }}
                        >
                            <div
                                style={{
                                    height: `${virtualizer.getTotalSize()}px`,
                                    width: "100%",
                                    position: "relative",
                                }}
                            >
                                {virtualizer.getVirtualItems().map((item) => {
                                    const action = mappedActions[item.index];

                                    const style = {
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: `${item.size}px`,
                                        transform: `translateY(${item.start}px)`,
                                    } as const;

                                    if (typeof action === "string") {
                                        return (
                                            <div
                                                style={style}
                                                key={action}
                                                className="flex py-2 px-3 uppercase text-sm items-center font-bold text-zinc-50/50"
                                            >
                                                {action}
                                            </div>
                                        );
                                    }

                                    console.log({ action });

                                    return (
                                        // biome-ignore lint/a11y/useKeyWithClickEvents: this is fine
                                        // biome-ignore lint/a11y/useKeyWithMouseEvents: this is also fine
                                        <div
                                            style={style}
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
                                            className="flex gap-1 py-0 px-3 h-12 items-center rounded text-base data-[active=true]:bg-white/5"
                                        >
                                            <div className="grow-0 shrink-0 basis-auto w-4 h-4">
                                                <action.icon />
                                            </div>
                                            <span className="truncate text-zinc-50/80 leading-normal">
                                                {action.title}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                            {/*  */}
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
                className="grow border-0 bg-transparent focus:outline-none focus:ring-0"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search"
            />
        </div>
    );
}

export function NavigationAction(input: {
    path: string;
    prefix?: boolean;
    title: string;
    category: string;
    icon?: (props: any) => React.ReactNode;
    disabled?: boolean;
    router: ReturnType<typeof useRouter>;
    pathname: string;
}): Action {
    return {
        icon: input.icon || ArrowElbowDownRight,
        title: input.title,
        category: input.category,
        disabled:
            input.disabled ||
            (input.path.startsWith("/") &&
                (!input.prefix
                    ? input.pathname === input.path
                    : input.pathname.startsWith(input.path))) ||
            (input.path.startsWith("./") &&
                (!input.prefix
                    ? input.pathname.endsWith(input.path.substring(1))
                    : input.pathname.includes(input.path.substring(1)))),
        run: (control) => {
            control.hide();
            input.router.push(input.path);
        },
    };
}

export function useCommandBar() {
    const ctx = useContext(CommandBarContext);
    if (!ctx) throw new Error("No commandbar context");
    return ctx;
}
