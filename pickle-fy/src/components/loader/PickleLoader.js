import fs from 'node:fs';
import path from 'node:path';
import LoaderAnimation from './LoaderAnimation';
import './loader.css';

/**
 * Full-screen loading overlay: the chilli ripens, bursts into seeds, and one
 * seed grows to reveal the page.
 *
 * This is a Server Component. It inlines the artwork (loader-scene.svg) into
 * the HTML so the animation can start instantly, and <LoaderAnimation />
 * (a client component) brings it to life.
 */
const sceneSvg = fs.readFileSync(
  path.join(process.cwd(), 'src/components/loader/loader-scene.svg'),
  'utf8'
);

export default function PickleLoader() {
  return (
    <>
      <div id="ov">
        <div className="wrap">
          <div className="scene" dangerouslySetInnerHTML={{ __html: sceneSvg }} />
          <div id="pct">
            <span id="n">0</span>%
          </div>
        </div>
      </div>
      <LoaderAnimation />
    </>
  );
}
