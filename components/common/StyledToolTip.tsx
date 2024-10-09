import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props extends React.HTMLProps<HTMLDivElement> {
  content: any;
  disable: boolean;
}

export function StyledTooltip(props: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{props.children}</TooltipTrigger>
        <TooltipContent hidden={props.disable} className="bg-white p-0 ">
          {props.content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
