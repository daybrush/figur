import React, { useEffect } from 'react';
import { be } from 'shape-svg';
import './App.css';
import { Poly, Star } from './react-shape-svg/Shape';

function App() {
  var colors = ["#f55", "#277EC9", "#80449D", "#D6631C", "#B8EDA0", "#B7EFF1", "#333"];
  var linejoins = ["bevel", "arcs", "round", "miter", "miter-clip"] as const;
  const polies: JSX.Element[] = [];
  const stars: JSX.Element[] = [];
  const polies2: JSX.Element[] = [];

  for (var side = 3; side <= 10; ++side) {
    polies.push(<Poly key={side} side={side} strokeWidth={7} stroke={colors[side % 7]} width={100} />);
    stars.push(<Star key={side} side={side} strokeWidth={7} stroke={colors[side % 7]} width={100} strokeLinejoin={linejoins[side % 5]} />);
    polies2.push(<Star
      key={side}
      side={side}
      css={true}
      split={side % 2 ? 2 : 1}
      innerRadius={side % 2 ? 100 : undefined}
      strokeWidth={5}
      stroke={colors[side % 7]}
      height={100}
    />);
  }
  useEffect(() => {
    setTimeout(function () {
      var polygons = document.querySelectorAll<SVGPathElement>("#poly2 path");
      for (var side = 3; side <= 10; ++side) {
        be(polygons[side - 3], {
          side: side, css: true, split: side % 2 ? 1 : 2,
          innerRadius: side % 2 ? 30 : 100, strokeWidth: 5,
          stroke: colors[(side + 1) % 7], height: 100,
        })
      }
    }, 1000);
  }, [])
  return (
    <div className="App">
      <div id="poly">
        {polies}
      </div>
      <div id="star">
        {stars}
      </div>
      <div id="poly2">
        {polies2}
      </div>
    </div>
  );
}

export default App;
