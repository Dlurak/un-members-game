import "react";
import { useEffect, useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface MapProps {
  onClick: (country: string) => void;
}

export const Map: React.FC<MapProps> = ({ onClick }) => {
  const element = useRef<HTMLDivElement | null>(null);
  const [vectorGraphic, setVectorGraphic] = useState<string | null>(null);

  useEffect(() => {
    fetch("/world.svg")
      .then((r) => r.text())
      .then(setVectorGraphic);
  }, []);

  useEffect(() => {
    if (!vectorGraphic) return;
    if (!element.current) return;

    element.current.innerHTML = vectorGraphic;
    element.current.getElementsByTagName("svg")[0].style.width = "100%";
    element.current.getElementsByTagName("svg")[0].style.height = "auto";

    element.current.querySelectorAll("path").forEach((path) => {
      path.addEventListener("click", () => {
        const name = path.getAttribute("class") || path.getAttribute("name");
        if (!name) return;

        onClick(name);
      });
    });
  }, [vectorGraphic, element]);

  return (
    <div>
      <TransformWrapper>
        <TransformComponent>
          <div
            style={{
              height: "100vh",
              width: "100%",
			  paddingTop: "1rem",
              padding: "4rem",
            }}
          >
            <div ref={element} style={{ width: "100%", height: "100%" }} />;
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};
