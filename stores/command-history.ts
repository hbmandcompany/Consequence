import type { WorkspaceSnapshot } from "@/lib/workspace/types";

export type Command = {
  id: string;
  label: string;
  do: (state: WorkspaceSnapshot) => WorkspaceSnapshot;
  undo: (state: WorkspaceSnapshot) => WorkspaceSnapshot;
  toJSON: () => Record<string, unknown>;
};

export type CommandHistory = {
  undoStack: Command[];
  redoStack: Command[];
};

export function createCommandHistory(): CommandHistory {
  return { undoStack: [], redoStack: [] };
}

export function pushCommand(
  history: CommandHistory,
  command: Command
): CommandHistory {
  return {
    undoStack: [...history.undoStack, command],
    redoStack: [],
  };
}

export function undoCommand(
  history: CommandHistory,
  state: WorkspaceSnapshot
): { history: CommandHistory; state: WorkspaceSnapshot } | null {
  const command = history.undoStack[history.undoStack.length - 1];
  if (!command) return null;
  return {
    history: {
      undoStack: history.undoStack.slice(0, -1),
      redoStack: [...history.redoStack, command],
    },
    state: command.undo(state),
  };
}

export function redoCommand(
  history: CommandHistory,
  state: WorkspaceSnapshot
): { history: CommandHistory; state: WorkspaceSnapshot } | null {
  const command = history.redoStack[history.redoStack.length - 1];
  if (!command) return null;
  return {
    history: {
      undoStack: [...history.undoStack, command],
      redoStack: history.redoStack.slice(0, -1),
    },
    state: command.do(state),
  };
}
