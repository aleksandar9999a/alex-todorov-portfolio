import Constellation from './Constellation';
import Star from './Star';
import config from './../../configs/constellation_config';


function createConstellation(canvas: HTMLCanvasElement) {
    return new Constellation(canvas, config);
}

function createStar(context: CanvasRenderingContext2D, width: number, height: number) {
    return new Star(context, width, height, config);
}

export {
    createConstellation,
    createStar
}