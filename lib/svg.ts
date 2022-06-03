import { ElementCompact, js2xml, xml2js } from "xml-js";

export function customizeSvg(
  file: Buffer | string,
  { color, size }: { color?: string; size?: string },
) {
	const svg: ElementCompact = xml2js(file.toString(), { compact: true });

	if (color) {
    walkSvg(svg, (element) => {
      if (element._attributes) {
        delete element._attributes.fill;
        delete element._attributes.stroke;
      }
    });
    svg.svg._attributes.fill = color;
  }

	if (size) {
		const width = size.split("x")[0] || size;
		const height = size.split("x")[1] || (size * svg.svg._attributes.height / svg.svg._attributes.width);
    svg.svg._attributes.width = width;
    svg.svg._attributes.height = height;
  }

	return js2xml(svg, { compact: true });
}

function walkSvg(
  svg: ElementCompact,
  callback: (element: ElementCompact) => void,
) {
  let queue = [svg];

	while (queue.length > 0) {
    const element = queue.shift()!;
    callback(element);

	  queue = queue.concat(
      Object.entries(element)
        .filter(([key, _]) => !key.startsWith("_"))
        .flatMap(([_, element]) =>
          element.length !== undefined ? element : [element],
        ),
    );
  }
}
