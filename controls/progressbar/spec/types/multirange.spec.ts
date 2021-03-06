import { ProgressBar } from '../../src/progressbar/progressbar';
import { createElement, EmitType } from '@syncfusion/ej2-base';
import { ILoadedEventArgs } from '../../src/progressbar/model/progress-interface';
/**
 * progress multirange for both linear and circular progress bar
 */
describe('ProgressBar Control', () => {
    beforeAll(() => {
        const isDef = (o: any) => o !== undefined && o !== null;
        if (!isDef(window.performance)) {
            console.log('Unsupported environment, window.performance.memory is unavailable');
            this.skip(); //Skips test (in Chai)
            return;
        }
    });
    describe('ProgressBar segmentColor for linear', () => {
        let progress: ProgressBar;
        let element: HTMLElement;
        let path: Element;
        let strokeColor: string;
        let pathlength: number;
        let loaded: EmitType<ILoadedEventArgs>;
        beforeAll((): void => {
            element = createElement('div', { id: 'container' });
            document.body.appendChild(element);
            progress = new ProgressBar({
                type: 'Linear',
                segmentCount:4,
                
            });
            progress.appendTo('#container');
        });
        afterAll((): void => {
            progress.destroy();
            element.remove();
        });
        it('checking without segmentColor  for linear', () => {
            loaded = (args: Object): void => {
                path = document.getElementById('container_Linearprogress');
                expect(path !== null).toBe(true);
            }
            progress.value = 50;
            progress.loaded = loaded;
            progress.refresh();
        });
        it('checking with defaultsegmentgap  for linear', () => {
            loaded = (args: Object): void => {
                path = document.getElementById('container_Linearprogress');
                expect(path === null).toBe(true);
            }
            progress.segmentColor = ['black','green'];
            progress.loaded = loaded;
            progress.refresh();
        });
        it('checking with segmentColor  for linear', () => {
            loaded = (args: Object): void => {
                path = document.getElementById('container_Linearprogress');
                expect(path === null).toBe(true);
            }
            progress.loaded = loaded;
            progress.refresh();
        });
        it('checking with sufficient segmentColor  for linear', () => {
            loaded = (args: Object): void => {
                path = document.getElementById('container_LinearProgress2');
                strokeColor = path.getAttribute('stroke');
                expect(strokeColor === 'green').toBe(true);
            }
            progress.value = 70
            progress.segmentColor = ['black','red','green'];
            progress.loaded = loaded;
            progress.refresh();
        });
        it('checking with insufficient segmentColor  for linear', () => {
            loaded = (args: Object): void => {
                path = document.getElementById('container_LinearProgress2');
                strokeColor = path.getAttribute('stroke');
                expect(strokeColor === 'black').toBe(true);
            }
            progress.value = 70
            progress.segmentColor = ['black'];
            progress.loaded = loaded;
            progress.refresh();
        });
        it('checking with segment color for linear buffer', ()=>{
            loaded = (args: Object): void => {
                path = document.getElementById('container_LinearBuffer3');
                strokeColor = path.getAttribute('stroke');
                expect(strokeColor === 'green').toBe(true);
            }
            progress.secondaryProgress = 80
            progress.segmentColor = ['black','green'];
            progress.loaded = loaded;
            progress.refresh();
        });
        it('checking with segment color with RTL for linear ', ()=>{
            loaded = (args: Object): void => {
                path = document.getElementById('container_LinearProgress1');
                strokeColor = path.getAttribute('stroke');
                expect(strokeColor === 'green').toBe(true);
            }
            progress.enableRtl = true;
            progress.value = 50;
            progress.loaded = loaded;
            progress.refresh();
        });
        it('checking with segment color and corner round',()=>{
            loaded = (args: Object): void => {
                path = document.getElementById('container_LinearProgress1');
                strokeColor = path.getAttribute('stroke');
                expect(strokeColor === 'green').toBe(true);
            }
            progress.enableRtl = false;
            progress.cornerRadius = 'Round';
            progress.loaded = loaded;
            progress.refresh();
        });
        it('checking with segment color for linear buffer and corner round', ()=>{
            loaded = (args: Object): void => {
                path = document.getElementById('container_LinearBuffer3');
                strokeColor = path.getAttribute('stroke');
                expect(strokeColor === 'green').toBe(true);
            }
            progress.loaded = loaded;
            progress.refresh();
        });
     });
     describe('ProgressBar segmentColor for circular', () => {
        let progress: ProgressBar;
        let element: HTMLElement;
        let path: Element;
        let strokeColor: string;
        let loaded: EmitType<ILoadedEventArgs>;
        beforeAll((): void => {
            element = createElement('div', { id: 'container' });
            document.body.appendChild(element);
            progress = new ProgressBar({
                type: 'Circular',
                segmentCount:4,
                gapWidth:5,
            });
            progress.appendTo('#container');
        });
        afterAll((): void => {
            progress.destroy();
            element.remove();
        });
        it('checking without segmentColor  for circular', () => {
            loaded = (args: Object): void => {
                path = document.getElementById('container_Circularprogress');
                expect(path !== null).toBe(true);
            }
            progress.value = 50;
            progress.loaded = loaded;
            progress.refresh();
        });
        it('checking with segmentColor  for linear', () => {
            loaded = (args: Object): void => {
                path = document.getElementById('container_Circularprogress');
                expect(path === null).toBe(true);
            }
            progress.segmentColor = ['black','green'];
            progress.loaded = loaded;
            progress.refresh();
        });
        it('checking with sufficient segmentColor  for circular', () => {
            loaded = (args: Object): void => {
                path = document.getElementById('container_CircularProgress2');
                strokeColor = path.getAttribute('stroke');
                expect(strokeColor === 'green').toBe(true);
            }
            progress.value = 70
            progress.segmentColor = ['black','red','green'];
            progress.loaded = loaded;
            progress.refresh();
        });
        it('checking with insufficient segmentColor  for circular', () => {
            loaded = (args: Object): void => {
                path = document.getElementById('container_CircularProgress2');
                strokeColor = path.getAttribute('stroke');
                expect(strokeColor === 'black').toBe(true);
            }
            progress.segmentColor = ['black'];
            progress.loaded = loaded;
            progress.refresh();
        });
        it('checking with insufficient segmentColor  for circularRTl', () => {
            loaded = (args: Object): void => {
                path = document.getElementById('container_CircularProgress2');
                strokeColor = path.getAttribute('stroke');
                expect(strokeColor === 'black').toBe(true);
            }
            progress.enableRtl = true;
            progress.loaded = loaded;
            progress.refresh();
        });
        it('checking with  segmentColor  for circularbuffer', () => {
            loaded = (args: Object): void => {
                path = document.getElementById('container_CircularBuffer3');
                strokeColor = path.getAttribute('stroke');
                expect(strokeColor === 'black').toBe(true);
            }
            progress.secondaryProgress = 80;
            progress.segmentColor = ['black','red','green'];
            progress.loaded = loaded;
            progress.refresh();
        });
        it('checking with  segmentColor with corner round for circulaprogres', () => {
            loaded = (args: Object): void => {
                path = document.getElementById('container_CircularProgress1');
                strokeColor = path.getAttribute('stroke');
                expect(strokeColor === 'red').toBe(true);
            }
            progress.value = 50;
            progress.cornerRadius = 'Round';
            progress.loaded = loaded;
            progress.refresh();
        });
        it('checking with  segmentColor with corner round for semicirculaprogres', () => {
            loaded = (args: Object): void => {
                path = document.getElementById('container_CircularProgress1');
                strokeColor = path.getAttribute('stroke');
                expect(strokeColor === 'red').toBe(true);
            }
            progress.startAngle = 270;
            progress.endAngle = 90;
            progress.loaded = loaded;
            progress.refresh();
        });
    });
});