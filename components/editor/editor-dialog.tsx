"use client";

import type { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface EditorDialogProps {
  /** Controlled open state. Owned by the caller. */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  /** Optional supporting copy under the title. */
  description?: string;
  /** Footer actions — the dialog's buttons. */
  footer?: ReactNode;
  /** Body content between the header and the footer. */
  children?: ReactNode;
  /** Extra classes for the dialog surface, e.g. a wider `sm:max-w-*`. */
  className?: string;
}

/**
 * Dialog pattern for editor screens: title, optional description, body, and a
 * footer for actions.
 *
 * No concrete dialog is built on top of it yet — screens compose it when a flow
 * needs one. All surfaces come from the tokens in `globals.css`:
 * `--bg-elevated` for the panel plus `--rounded-3xl` for the modal radius from
 * ui-context.md § Layout Patterns. The generated `DialogContent` ships
 * `rounded-xl` and `DialogFooter` `rounded-b-xl`; the overrides below keep both
 * at the documented 24px modal radius without touching `components/ui/*`.
 */
export function EditorDialog({
  open,
  onOpenChange,
  title,
  description,
  footer,
  children,
  className,
}: EditorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-slot="editor-dialog"
        className={cn(
          "rounded-3xl bg-elevated text-copy-primary",
          className
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-copy-primary">{title}</DialogTitle>
          {description ? (
            <DialogDescription className="text-copy-muted">
              {description}
            </DialogDescription>
          ) : null}
        </DialogHeader>

        {children}

        {footer ? (
          <DialogFooter className="rounded-b-3xl">{footer}</DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
