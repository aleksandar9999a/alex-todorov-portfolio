import { createStar } from './ConstellationAdapter';
import Star from './Star';


export default class Constellation {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D | null;
    private config: any;
    private createStar = createStar;

    constructor(canvas: HTMLCanvasElement, config: any) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.config = config;
        this.canvas.width = this.config.width;
        this.canvas.height = this.config.height;
    }

    private setContext() {
        if (!this.context) {
          return;
        }

        this.context.fillStyle = this.config.star.color;
        this.context.strokeStyle = this.config.line.color;
        this.context.lineWidth = this.config.line.width;
    };

    private loop(callback: Function) {
        callback()
        requestAnimationFrame(this.loop.bind(this, callback));
    };

    private subscribeForResize(star: Star) {
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth - 20;
            this.canvas.height = window.innerHeight;
            this.setContext();
            star.setWindowSize(window.innerWidth, window.innerHeight);
        })
    }
    
    init() {
        if (!this.context) {
          return;
        }

        this.setContext();

        const star = this.createStar(this.context, this.canvas.width, this.canvas.height);
        star.create();

        this.subscribeForResize(star);

        this.loop(star.animate.bind(star));
        this.loop(star.line.bind(star));
    };
}