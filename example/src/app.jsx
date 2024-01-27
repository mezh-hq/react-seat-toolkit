import { useEffect, useRef } from "react";
import { Home } from "lucide-react";
import { useCursor } from "react-seat-designer";
import * as d3 from "d3";

const App = () => {
  const { setCursor } = useCursor();

  const rectRef = useRef();

  useEffect(() => {
    const handleDrag = d3.drag().on("drag", function (event) {
      const me = d3.select(this);
      console.log(event.x, event.y);
      me.attr("x", event.x);
      me.attr("y", event.y);
    });
    const node = rectRef.current;
    handleDrag(d3.select(node));
  }, []);

  useEffect(() => {
    setCursor(Home);
  }, []);

  return (
    <div className="flex justify-center items-center">
      123
      <svg style={{ border: "1px solid" }} width={300} height={300}>
        <rect ref={rectRef} x={20} y={20} width={50} height={50} />
      </svg>
    </div>
  );
};

export default App;
