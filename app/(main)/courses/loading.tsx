import { Loader } from "lucide-react";

type Props = {};
const Loading = ({}: Props) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader className="w-6 h-6 text-muted-foreground animate-spin" />
    </div>
  );
};

export default Loading;
