"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Render a dialog root element with a data-slot of "dialog" and passthrough props.
 *
 * @param props - Props forwarded to the underlying Dialog root element
 * @returns The dialog root React element
 */
function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

/**
 * Renders a dialog trigger element that forwards all props to the underlying Radix Trigger.
 *
 * The rendered element includes a `data-slot="dialog-trigger"` attribute to support slot-based styling.
 *
 * @returns The dialog trigger element with forwarded props
 */
function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

/**
 * Renders a Radix Dialog Portal with a `data-slot="dialog-portal"` attribute and forwards all props.
 *
 * @returns The rendered `DialogPrimitive.Portal` element with `data-slot="dialog-portal"` and any provided props.
 */
function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

/**
 * Renders a dialog close control with a consistent data-slot attribute.
 *
 * Forwards all received props to the underlying close primitive and sets data-slot="dialog-close".
 *
 * @returns The rendered close control element for the dialog
 */
function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

/**
 * Renders the dialog backdrop overlay with entrance/exit animations and fixed positioning.
 *
 * Combines the component's default overlay classes (backdrop color, z-index, and open/close animations) with any provided `className` and forwards remaining props to the underlying Radix overlay primitive.
 *
 * @returns The overlay element used as the dialog backdrop.
 */
function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders dialog content inside a Portal with a backdrop overlay and optional internal close button.
 *
 * @param showCloseButton - When `true`, renders an internal close button in the top-right corner; defaults to `true`.
 * @returns The dialog content element (wrapped in a Portal) including an overlay and any provided children.
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

/**
 * Renders the dialog header container with consistent layout and slot attributes.
 *
 * @returns A `div` element used as the dialog header with `data-slot="dialog-header"` and composed class names.
 */
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

/**
 * Layout container for dialog footer actions with responsive spacing and alignment.
 *
 * @param className - Additional CSS class names to append to the component's default responsive layout classes
 * @returns A `<div>` element with `data-slot="dialog-footer"`, column-reverse stacking and gap on small screens, and row layout right-aligned on larger screens
 */
function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a styled dialog title element with a consistent data-slot and typography classes.
 *
 * @returns A `DialogPrimitive.Title` element with `data-slot="dialog-title"` and combined typography classes
 */
function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Renders a dialog description element with muted, small text styling.
 *
 * @returns A DialogPrimitive.Description element with `data-slot="dialog-description"` and composed className for muted, small text (overridable via `className`).
 */
function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}