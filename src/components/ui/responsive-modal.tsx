import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

interface ResponsiveModalContextValue {
  isMobile: boolean;
}

const ResponsiveModalContext = React.createContext<ResponsiveModalContextValue>({
  isMobile: false,
});

interface ResponsiveModalProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ResponsiveModal = ({ children, open, onOpenChange }: ResponsiveModalProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <ResponsiveModalContext.Provider value={{ isMobile }}>
        <Drawer open={open} onOpenChange={onOpenChange}>
          {children}
        </Drawer>
      </ResponsiveModalContext.Provider>
    );
  }

  return (
    <ResponsiveModalContext.Provider value={{ isMobile }}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        {children}
      </Dialog>
    </ResponsiveModalContext.Provider>
  );
};

const ResponsiveModalTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof DialogTrigger>
>(({ className, children, ...props }, ref) => {
  const { isMobile } = React.useContext(ResponsiveModalContext);

  if (isMobile) {
    return (
      <DrawerTrigger ref={ref} className={className} {...props}>
        {children}
      </DrawerTrigger>
    );
  }

  return (
    <DialogTrigger ref={ref} className={className} {...props}>
      {children}
    </DialogTrigger>
  );
});
ResponsiveModalTrigger.displayName = "ResponsiveModalTrigger";

const ResponsiveModalContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DialogContent>
>(({ className, children, ...props }, ref) => {
  const { isMobile } = React.useContext(ResponsiveModalContext);

  if (isMobile) {
    return (
      <DrawerContent ref={ref} className={cn("px-4 pb-6", className)} {...props}>
        {children}
      </DrawerContent>
    );
  }

  return (
    <DialogContent ref={ref} className={className} {...props}>
      {children}
    </DialogContent>
  );
});
ResponsiveModalContent.displayName = "ResponsiveModalContent";

const ResponsiveModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { isMobile } = React.useContext(ResponsiveModalContext);

  if (isMobile) {
    return <DrawerHeader className={className} {...props} />;
  }

  return <DialogHeader className={className} {...props} />;
};
ResponsiveModalHeader.displayName = "ResponsiveModalHeader";

const ResponsiveModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { isMobile } = React.useContext(ResponsiveModalContext);

  if (isMobile) {
    return <DrawerFooter className={className} {...props} />;
  }

  return <DialogFooter className={className} {...props} />;
};
ResponsiveModalFooter.displayName = "ResponsiveModalFooter";

const ResponsiveModalTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof DialogTitle>
>(({ className, ...props }, ref) => {
  const { isMobile } = React.useContext(ResponsiveModalContext);

  if (isMobile) {
    return <DrawerTitle ref={ref} className={className} {...props} />;
  }

  return <DialogTitle ref={ref} className={className} {...props} />;
});
ResponsiveModalTitle.displayName = "ResponsiveModalTitle";

const ResponsiveModalDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof DialogDescription>
>(({ className, ...props }, ref) => {
  const { isMobile } = React.useContext(ResponsiveModalContext);

  if (isMobile) {
    return <DrawerDescription ref={ref} className={className} {...props} />;
  }

  return <DialogDescription ref={ref} className={className} {...props} />;
});
ResponsiveModalDescription.displayName = "ResponsiveModalDescription";

const ResponsiveModalClose = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof DialogClose>
>(({ className, ...props }, ref) => {
  const { isMobile } = React.useContext(ResponsiveModalContext);

  if (isMobile) {
    return <DrawerClose ref={ref} className={className} {...props} />;
  }

  return <DialogClose ref={ref} className={className} {...props} />;
});
ResponsiveModalClose.displayName = "ResponsiveModalClose";

export {
  ResponsiveModal,
  ResponsiveModalTrigger,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalFooter,
  ResponsiveModalTitle,
  ResponsiveModalDescription,
  ResponsiveModalClose,
};
