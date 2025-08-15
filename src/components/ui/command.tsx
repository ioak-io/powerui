import {
  Command as CommandPrimitive,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui-library/command";

const Command = CommandPrimitive;
const CommandDialogWrapper = CommandDialog;
const CommandInputWrapper = CommandInput;
const CommandListWrapper = CommandList;
const CommandEmptyWrapper = CommandEmpty;
const CommandGroupWrapper = CommandGroup;
const CommandItemWrapper = CommandItem;
const CommandShortcutWrapper = CommandShortcut;
const CommandSeparatorWrapper = CommandSeparator;

export {
  Command,
  CommandDialogWrapper as CommandDialog,
  CommandInputWrapper as CommandInput,
  CommandListWrapper as CommandList,
  CommandEmptyWrapper as CommandEmpty,
  CommandGroupWrapper as CommandGroup,
  CommandItemWrapper as CommandItem,
  CommandShortcutWrapper as CommandShortcut,
  CommandSeparatorWrapper as CommandSeparator,
};
