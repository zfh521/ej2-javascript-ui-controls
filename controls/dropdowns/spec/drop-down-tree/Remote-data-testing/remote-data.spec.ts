import { Browser, createElement, setCulture } from '@syncfusion/ej2-base';
import { DropDownTree } from '../../../src/drop-down-tree/drop-down-tree';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { remoteData, remoteData2, remoteData2_1, remoteData1_1, remoteData3_1 } from '../dataSource.spec';
import '../../../node_modules/es6-promise/dist/es6-promise';



describe('DropDownTree with remote datasource functionality testing', () => {
    describe('with empty arguments', () => {
        let ddtreeObj: any;
        let ele: HTMLElement = createElement('input', { id: 'tree1' });
        let dataManager1: DataManager = new DataManager({ url: '/TreeView/remoteData' });
        beforeEach((done: Function) => {
            jasmine.Ajax.install();
            document.body.appendChild(ele);
            ddtreeObj = new DropDownTree({
                fields: { dataSource: dataManager1, value: 'OrderID', text: 'CustomerID', iconCss: 'ShipCity', imageUrl: 'ShipCountry', tooltip: 'ShipName', hasChildren: 'Freight' },
            });
            ddtreeObj.appendTo(ele);
            setTimeout(function () { done() });
            this.request = jasmine.Ajax.requests.mostRecent();
            this.request.respondWith({
                status: 200,
                responseText: JSON.stringify({ d: [], __count: 0 })
            });
        });
        afterEach(() => {
            if (ele)
                ele.remove();
            document.body.innerHTML = '';
            jasmine.Ajax.uninstall();
        });
        it('functionality testing', () => {
            expect(ddtreeObj.treeObj.element.querySelectorAll('li').length).toBe(0);
            ddtreeObj.value = ['11'];
            ddtreeObj.text = 'aaaa';
            ddtreeObj.dataBind();
            expect(ddtreeObj.value).toBe(null);
            expect(ddtreeObj.text).toBe(null);
        });
    });
    describe('without datasource', () => {
        let ddtreeObj: any;
        let ele: HTMLElement = createElement('input', { id: 'tree1' });
        let dataManager1: DataManager = new DataManager({ url: '/TreeView/remoteData' });
        beforeEach((done: Function) => {
            jasmine.Ajax.install();
            document.body.appendChild(ele);
            ddtreeObj = new DropDownTree({
                fields: { dataSource: [], value: 'OrderID', text: 'CustomerID', iconCss: 'ShipCity', imageUrl: 'ShipCountry', tooltip: 'ShipName', hasChildren: 'Freight' },
            });
            ddtreeObj.appendTo(ele);
            setTimeout(function () { done() });
            this.request = jasmine.Ajax.requests.mostRecent();
            this.request.respondWith({
                status: 200,
                responseText: JSON.stringify({ d: [], __count: 0 })
            });
        });
        afterEach(() => {
            if (ele)
                ele.remove();
            document.body.innerHTML = '';
            jasmine.Ajax.uninstall();
        });
        it('functionality testing', () => {
            expect(ddtreeObj.treeObj.element.querySelectorAll('li').length).toBe(0);
            ddtreeObj.value = ['11'];
            ddtreeObj.dataBind();
            expect(ddtreeObj.value).toBe(null);
        });
    });
    describe('with id as number', () => {
        let mouseEventArgs: any = {
            preventDefault: (): void => { },
            stopImmediatePropagation: (): void => { },
            target: null,
            type: null,
            shiftKey: false,
            ctrlKey: false
        };
        let tapEvent: any = {
            originalEvent: mouseEventArgs,
            tapCount: 1
        };
        let ddtreeObj: any;
        let ele: HTMLElement = createElement('input', { id: 'tree1' });
        let dataManager1: DataManager = new DataManager({ url: '/TreeView/remoteData' });
        let originalTimeout: any;
        beforeAll((done: Function) => {
            jasmine.Ajax.install();
            document.body.appendChild(ele);
            ddtreeObj = new DropDownTree({
                fields: {
                    dataSource: dataManager1, value: 'OrderID', text: 'CustomerID', iconCss: 'ShipCity', tooltip: 'ShipName', selected: 'nodeSelected', hasChildren: 'Freight', query: new Query().from("Categories").select("CategoryID,CategoryName,Description").take(7),
                    child: { dataSource: dataManager1, value: 'CustomerID', text: 'ShipCountry', parentValue: 'OrderID' },
                },
                treeSettings: { loadOnDemand: true }

            });
            ddtreeObj.appendTo(ele);
            setTimeout(function () { done() });
            this.request = jasmine.Ajax.requests.mostRecent();
            this.request.respondWith({
                status: 200,
                responseText: JSON.stringify({ d: remoteData, __count: 15 })
            });
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        });
        afterAll(() => {
            if (ele)
                ele.remove();
            document.body.innerHTML = '';
            jasmine.Ajax.uninstall();
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
        it('functionality testing', (done: Function) => {
            expect(ddtreeObj.treeObj.element.querySelectorAll('li').length).toBe(15);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-text').innerHTML).toBe('VINET');
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').getAttribute('data-uid')).toBe('10248');
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-icon').classList.contains('Reims')).toBe(true);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').title).toBe('Vins et alcools Chevalier');
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').classList.contains('e-active')).toBe(true);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').childElementCount).toBe(2);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').querySelector('.e-icons')).not.toBe(null);
            let newli: Element[] = <Element[] & NodeListOf<Element>>ddtreeObj.treeObj.element.querySelectorAll('li');
            mouseEventArgs.target = newli[1].querySelector('.e-icons');
            expect(newli[1].childElementCount).toBe(2);
            ddtreeObj.treeObj.preventContextMenu(mouseEventArgs);
            ddtreeObj.treeObj.touchClickObj.tap(tapEvent);
            this.request = jasmine.Ajax.requests.mostRecent();
            this.request.respondWith({
                status: 200,
                responseText: JSON.stringify({ d: [], __count: 0 })
            });
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            setTimeout(function () {
                expect(newli[1].childElementCount).toBe(2);
                expect(newli[1].querySelector('.e-icons')).toBe(null);
                mouseEventArgs.target = newli[0].querySelector('.e-icons');
                expect(newli[0].childElementCount).toBe(2);
                ddtreeObj.treeObj.touchClickObj.tap(tapEvent);
                expect(newli[0].querySelector('.e-icons').classList.contains('e-icons-spinner')).toBe(true);
                this.request = jasmine.Ajax.requests.mostRecent();
                this.request.respondWith({
                    status: 200,
                    responseText: JSON.stringify({ d: remoteData, __count: 15 })
                });
                jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
                setTimeout(function () {
                    expect(newli[0].childElementCount).toBe(3);
                    ddtreeObj.text = 'Music';
                    ddtreeObj.dataBind();
                    expect(ddtreeObj.text).toBe(null);
                    done();
                }, 100);
            }, 100);
        });
    });
    describe('with id as string', () => {
        let mouseEventArgs: any = {
            preventDefault: (): void => { },
            stopImmediatePropagation: (): void => { },
            target: null,
            type: null,
            shiftKey: false,
            ctrlKey: false
        };
        let tapEvent: any = {
            originalEvent: mouseEventArgs,
            tapCount: 1
        };
        let ddtreeObj: any;
        let ele: HTMLElement = createElement('input', { id: 'tree1' });
        let dataManager1: DataManager = new DataManager({ url: '/TreeView/remoteData' });
        let originalTimeout: any;
        beforeAll((done: Function) => {
            jasmine.Ajax.install();
            document.body.appendChild(ele);
            ddtreeObj = new DropDownTree({
                fields: {
                    dataSource: dataManager1, value: 'CustomerID', text: 'OrderID', iconCss: 'ShipCity', tooltip: 'ShipName', hasChildren: 'Freight', tableName: 'Employees', htmlAttributes: 'HtmlAttr', imageUrl: 'Image', selected: 'nodeSelected',
                    child: { dataSource: dataManager1, value: 'CustomerID', text: 'ShipCountry', parentValue: 'OrderID', hasChildren: 'ShipCountry' }
                },
                treeSettings: { loadOnDemand: true }
            });
            ddtreeObj.appendTo(ele);
            setTimeout(function () { done() });
            this.request = jasmine.Ajax.requests.mostRecent();
            this.request.respondWith({
                status: 200,
                responseText: JSON.stringify({ d: remoteData, __count: 15 })
            });
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        });
        afterAll(() => {
            if (ele)
                ele.remove();
            document.body.innerHTML = '';
            jasmine.Ajax.uninstall();
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
        it('functionality testing', (done: Function) => {
            expect(ddtreeObj.treeObj.element.querySelectorAll('li').length).toBe(15);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-text').innerHTML).toBe('10248');
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').getAttribute('data-uid')).toBe('VINET');
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-icon').classList.contains('Reims')).toBe(true);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-img').src.indexOf('images/Shooting.png')).not.toBe(-1);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').title).toBe('Vins et alcools Chevalier');
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').classList.contains('e-active')).toBe(true);
            expect(ddtreeObj.treeObj.element.querySelectorAll('li')[2].classList.contains('firstnode')).toBe(true);
            expect(ddtreeObj.treeObj.element.querySelectorAll('li')[2].style.backgroundColor).toBe('red');
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').childElementCount).toBe(2);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').querySelector('.e-icons')).not.toBe(null);
            let newli: Element[] = <Element[] & NodeListOf<Element>>ddtreeObj.treeObj.element.querySelectorAll('li');
            mouseEventArgs.target = newli[1].querySelector('.e-icons');
            expect(newli[1].childElementCount).toBe(2);
            ddtreeObj.treeObj.touchClickObj.tap(tapEvent);
            this.request = jasmine.Ajax.requests.mostRecent();
            this.request.respondWith({
                status: 200,
                responseText: JSON.stringify({ d: [], __count: 0 })
            });
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            setTimeout(function () {
                expect(newli[1].childElementCount).toBe(2);
                expect(newli[1].querySelector('.e-icons')).toBe(null);
                mouseEventArgs.target = newli[0].querySelector('.e-icons');
                expect(newli[0].childElementCount).toBe(2);
                ddtreeObj.treeObj.touchClickObj.tap(tapEvent);
                this.request = jasmine.Ajax.requests.mostRecent();
                this.request.respondWith({
                    status: 200,
                    responseText: JSON.stringify({ d: remoteData, __count: 15 })
                });
                jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
                setTimeout(function () {
                    expect(newli[0].childElementCount).toBe(3);
                    expect(newli[0].querySelector('.e-icons')).not.toBe(null);
                    ddtreeObj.text = 'Music';
                    ddtreeObj.dataBind();
                    expect(ddtreeObj.text).toBe(null);
                    done();
                }, 100);
            }, 100);
        });
    });
    describe('enableRtl property testing', () => {
        let mouseEventArgs: any = {
            preventDefault: (): void => { },
            stopImmediatePropagation: (): void => { },
            target: null,
            type: null,
            shiftKey: false,
            ctrlKey: false
        };
        let tapEvent: any = {
            originalEvent: mouseEventArgs,
            tapCount: 1
        };
        let ddtreeObj: any;
        let ele: HTMLElement = createElement('input', { id: 'tree1' });
        let dataManager1: DataManager = new DataManager({ url: '/TreeView/remoteData' });
        let originalTimeout: any;
        beforeAll((done: Function) => {
            jasmine.Ajax.install();
            document.body.appendChild(ele);
            ddtreeObj = new DropDownTree({
                fields: {
                    dataSource: dataManager1, value: "nodeId", parentValue: 'nodePid', text: "nodeText", hasChildren: "hasChild",
                    tooltip: 'nodeTooltip', selected: 'nodeSelected'
                },
                enableRtl: true,
                treeSettings: { loadOnDemand: true }
            });
            ddtreeObj.appendTo(ele);
            setTimeout(function () { done() });
            this.request = jasmine.Ajax.requests.mostRecent();
            this.request.respondWith({
                status: 200,
                responseText: JSON.stringify({ d: remoteData2, __count: 2 })
            });
        });
        afterAll(() => {
            if (ele)
                ele.remove();
            document.body.innerHTML = '';
            jasmine.Ajax.uninstall();
        });
        it('functionality testing', (done: Function) => {
            expect(ddtreeObj.treeObj.element.classList.contains('e-rtl')).toBe(true);
            done();
        }, 100);
    });
});

describe('sortOrder property testing', () => {
    let ddtreeObj: any;
    let originalTimeout: any;
    let ele: HTMLElement = createElement('input', { id: 'tree1' });
    let dataManager1: DataManager = new DataManager({ url: '/TreeView/remoteData' });
    beforeEach((done: Function) => {
        jasmine.Ajax.install();
        document.body.appendChild(ele);
        ddtreeObj = new DropDownTree({ 
            fields: { dataSource: dataManager1, value: "nodeId", parentValue: 'nodePid', text: "nodeText", hasChildren: "hasChild", 
                iconCss: 'nodeIcon', imageUrl: 'nodeImage', tooltip: 'nodeTooltip', htmlAttributes: 'nodeHtmlAttr', selected: 'nodeSelected' 
            },
        });
        ddtreeObj.appendTo(ele);
        setTimeout(function () { done() });
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            status: 200,
            responseText: JSON.stringify({d: remoteData2, __count: 2})
        });
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    afterEach(() => {
        if (ele)
            ele.remove();
        document.body.innerHTML = '';
        jasmine.Ajax.uninstall();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    it('functionality testing', (done: Function) => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        setTimeout(function() {
            expect(ddtreeObj.treeObj.element.querySelectorAll('li').length).toBe(2);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-text').innerHTML).toBe('Music');
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').getAttribute('data-uid')).toBe('01');
            done();
        }, 100);
    });
});

describe('property change testing', () => {
    let mouseEventArgs: any;
    let tapEvent: any;
    let ddtreeObj: any;
    let dataManager1: DataManager = new DataManager({ url: '/TreeView/remoteData' });
    let originalTimeout: any;
    beforeEach((done: Function) => {
        mouseEventArgs = {
            preventDefault: (): void => { },
            stopImmediatePropagation: (): void => { },
            target: null,
            type: null,
            shiftKey: false,
            ctrlKey: false
        };
        tapEvent = {
            originalEvent: mouseEventArgs,
            tapCount: 1
        };
        jasmine.Ajax.install();
        let ele: HTMLElement = createElement('input', { id: 'tree1' });
        document.body.appendChild(ele);
        ddtreeObj = new DropDownTree({
            fields: {
                dataSource: dataManager1, value: "nodeId", parentValue: 'nodePid', text: "nodeText", hasChildren: "hasChild",
                iconCss: 'nodeIcon', imageUrl: 'nodeImage', tooltip: 'nodeTooltip', htmlAttributes: 'nodeHtmlAttr',
            },
            treeSettings: { loadOnDemand: true },
            text: 'Music'
        });
        ddtreeObj.appendTo(ele);
        setTimeout(function () { done() });
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            status: 200,
            responseText: JSON.stringify({ d: remoteData2, __count: 2 })
        });
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    afterEach(() => {
        if (ddtreeObj)
            ddtreeObj.destroy();
        document.body.innerHTML = '';
        jasmine.Ajax.uninstall();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    it('with text', (done: Function) => {
        expect(ddtreeObj.treeObj.element.querySelectorAll('li').length).toBe(2);
        expect(ddtreeObj.value.length).toBe(1);
        expect(ddtreeObj.value[0]).toBe('01');
        expect(ddtreeObj.text).toBe('Music');
        ddtreeObj.text = 'aaa';
        ddtreeObj.dataBind();
        expect(ddtreeObj.value[0]).toBe('01');
        expect(ddtreeObj.text).toBe('Music');
        ddtreeObj.showPopup();
        ddtreeObj.dataBind();
        let li: Element[] = <Element[] & NodeListOf<Element>>ddtreeObj.treeObj.element.querySelectorAll('li');
        expect(li[0].querySelector('.e-icons').classList.contains('e-icon-expandable')).toBe(true);
        expect(li[0].querySelector('.e-icons').classList.contains('e-icon-collapsible')).toBe(false);
        expect(li[0].querySelector('.e-list-text').childElementCount).toBe(0);
        tapEvent.tapCount = 2;
        mouseEventArgs.target = li[0].querySelector('.e-list-text');
        ddtreeObj.treeObj.touchExpandObj.tap(tapEvent);
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            status: 200,
            responseText: JSON.stringify({ d: remoteData2_1, __count: 2 })
        });
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        setTimeout(function () {
            expect(li[0].querySelector('.e-icons').classList.contains('e-icon-expandable')).toBe(false);
            expect(li[0].querySelector('.e-icons').classList.contains('e-icon-collapsible')).toBe(true);
            ddtreeObj.text = 'Downloads';
            ddtreeObj.dataBind();
            expect(ddtreeObj.value[0]).toBe('02');
            expect(ddtreeObj.text).toBe('Downloads');
            done();
        }, 100);
    });
});
describe('property change testing', () => {
    let mouseEventArgs: any;
    let tapEvent: any;
    let ddtreeObj: any;
    let dataManager1: DataManager = new DataManager({ url: '/TreeView/remoteData' });
    let originalTimeout: any;
    let i: number = 0, j: number = 0;
        function clickFn(): void {
            i++;
        }
    beforeEach((done: Function) => {
        mouseEventArgs = {
            preventDefault: (): void => { },
            stopImmediatePropagation: (): void => { },
            target: null,
            type: null,
            shiftKey: false,
            ctrlKey: false
        };
        tapEvent = {
            originalEvent: mouseEventArgs,
            tapCount: 1
        };
        jasmine.Ajax.install();
        let ele: HTMLElement = createElement('input', { id: 'tree1' });
        document.body.appendChild(ele);
        i = 0, j = 0;
        ddtreeObj = new DropDownTree({
            fields: {
                dataSource: dataManager1, value: "nodeId", parentValue: 'nodePid', text: "nodeText", hasChildren: "hasChild",
                iconCss: 'nodeIcon', imageUrl: 'nodeImage', tooltip: 'nodeTooltip', htmlAttributes: 'nodeHtmlAttr',
            },
            treeSettings: { loadOnDemand: true },
            value: ['01'],
            change: clickFn
        });
        ddtreeObj.appendTo(ele);
        setTimeout(function () { done() });
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            status: 200,
            responseText: JSON.stringify({ d: remoteData2, __count: 2 })
        });
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    afterEach(() => {
        if (ddtreeObj)
            ddtreeObj.destroy();
        document.body.innerHTML = '';
        jasmine.Ajax.uninstall();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    it('with value', (done: Function) => {
        expect(ddtreeObj.treeObj.element.querySelectorAll('li').length).toBe(2);
        expect(i).toBe(0);
        expect(ddtreeObj.value.length).toBe(1);
        expect(ddtreeObj.value[0]).toBe('01');
        expect(ddtreeObj.text).toBe('Music');
        ddtreeObj.value = ['aaa'];
        ddtreeObj.dataBind();
        expect(ddtreeObj.value[0]).toBe('01');
        expect(ddtreeObj.text).toBe('Music');
        ddtreeObj.showPopup();
        ddtreeObj.dataBind();
        let li: Element[] = <Element[] & NodeListOf<Element>>ddtreeObj.treeObj.element.querySelectorAll('li');
        expect(li[0].querySelector('.e-icons').classList.contains('e-icon-expandable')).toBe(true);
        expect(li[0].querySelector('.e-icons').classList.contains('e-icon-collapsible')).toBe(false);
        expect(li[0].childElementCount).toBe(2);
        expect(li[0].querySelector('.e-list-text').childElementCount).toBe(0);
        tapEvent.tapCount = 2;
        mouseEventArgs.target = li[0].querySelector('.e-list-text');
        ddtreeObj.treeObj.touchExpandObj.tap(tapEvent);
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            status: 200,
            responseText: JSON.stringify({ d: remoteData2_1, __count: 2 })
        });
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        setTimeout(function () {
            expect(li[0].querySelector('.e-icons').classList.contains('e-icon-expandable')).toBe(false);
            expect(li[0].querySelector('.e-icons').classList.contains('e-icon-collapsible')).toBe(true);
            ddtreeObj.value = ['02'];
            ddtreeObj.dataBind();
            expect(ddtreeObj.value[0]).toBe('02');
            expect(ddtreeObj.text).toBe('Downloads');
            done();
        }, 100);

    });

});

describe('Remote data Offline', () => {
    let mouseEventArgs: any = {
        preventDefault: (): void => { },
        stopImmediatePropagation: (): void => { },
        target: null,
        type: null,
        shiftKey: false,
        ctrlKey: false
    };
    let tapEvent: any = {
        originalEvent: mouseEventArgs,
        tapCount: 1
    };
    let ddtreeObj: any;
    let ele: HTMLElement = createElement('input', { id: 'tree1' });
    let dataManager1: DataManager;
    beforeAll((done: Function) => {
        jasmine.Ajax.install();
        dataManager1 = new DataManager({ url: '/TreeView/remoteData', offline: true })
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            status: 200,
            responseText: JSON.stringify({ d: remoteData3_1, __count: 2 })
        }); setTimeout(function () { done() });
        document.body.appendChild(ele);
        ddtreeObj = new DropDownTree({
            fields: {
                dataSource: dataManager1, value: 'nodeId', text: 'nodeText', iconCss: 'nodeIcon', imageUrl: 'nodeImage', tooltip: 'nodeTooltip', child: 'nodeChild'
            },
            treeSettings: { loadOnDemand: true }

        });
        ddtreeObj.appendTo('#tree1');
        setTimeout(function () { done() });
    });
    afterAll(() => {
        if (ele)
            ele.remove();
        document.body.innerHTML = '';
        jasmine.Ajax.uninstall();
    });
    it('Offline mode testing', (done: Function) => {
        let li: Element[] = <Element[] & NodeListOf<Element>>ddtreeObj.treeObj.element.querySelectorAll('li');
        expect(li[0].querySelector('.e-icons').classList.contains('e-icon-expandable')).toBe(true);
        expect(li[0].querySelector('.e-icons').classList.contains('e-icon-collapsible')).toBe(false);
        expect(li[0].childElementCount).toBe(2);
        expect(li[0].querySelector('.e-list-text').childElementCount).toBe(0);
        tapEvent.tapCount = 2;
        mouseEventArgs.target = li[0].querySelector('.e-list-text');
        ddtreeObj.treeObj.touchExpandObj.tap(tapEvent);
        setTimeout(function () {
            expect(li[0].querySelector('.e-icons').classList.contains('e-icon-expandable')).toBe(false);
            expect(li[0].querySelector('.e-icons').classList.contains('e-icon-collapsible')).toBe(true);
            expect(li[0].childElementCount).toBe(3);
            expect(ddtreeObj.getData('01')[0].nodeChild[0].nodeText).toBe('Gouttes.mp3');
            done();
        }, 450);
        tapEvent.tapCount = 2;
        mouseEventArgs.target = li[1].querySelector('.e-list-text');
        ddtreeObj.treeObj.touchExpandObj.tap(tapEvent);
        setTimeout(function () {
            expect(li[1].querySelector('.e-icons').classList.contains('e-icon-expandable')).toBe(false);
            expect(li[1].querySelector('.e-icons').classList.contains('e-icon-collapsible')).toBe(true);
            expect(li[1].childElementCount).toBe(3);
            expect(ddtreeObj.getData('02')[0].nodeChild.length).toBe(2);
            done();
        }, 450);
    });
});

describe('itemTemplate support testing with string', () => {
    let ddtreeObj: any;
    let ele: HTMLElement = createElement('div', { id: 'tree1' });
    let dataManager1: DataManager = new DataManager({ url: '/TreeView/remoteData' });
    beforeEach((done: Function) => {
        jasmine.Ajax.install();
        document.body.appendChild(ele);
        ddtreeObj = new DropDownTree({
            fields: {
                dataSource: dataManager1, value: "nodeId", parentValue: 'nodePid', text: "nodeText", hasChildren: "hasChild",
                tooltip: 'nodeTooltip', selected: 'nodeSelected'
            },
            itemTemplate: '${if(hasChild == undefined)}<b>${nodeText}</b>${else}<i>${nodeText}</i>${/if}',
        });
        ddtreeObj.appendTo(ele);
        setTimeout(function () { done(); });
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            status: 200,
            responseText: JSON.stringify({ d: remoteData2, __count: 2 })
        });
    });
    afterEach(() => {
        if (ele)
            ele.remove();
        document.body.innerHTML = '';
        jasmine.Ajax.uninstall();
    });
    it('functionality testing', (done: Function) => {
        let li: Element[] = <Element[] & NodeListOf<Element>>ddtreeObj.treeObj.element.querySelectorAll('.e-text-content');
        expect(li[0].querySelector('i')).not.toBe(null);
        expect(li[0].querySelector('b')).toBe(null);
        expect(li[1].querySelector('b')).not.toBe(null);
        expect(li[1].querySelector('i')).toBe(null);
        done();
    }, 450);
});
describe('headerTemplate support testing with string', () => {
    let ddtreeObj: any;
    let ele: HTMLElement = createElement('div', { id: 'tree1' });
    let dataManager1: DataManager = new DataManager({ url: '/TreeView/remoteData' });
    beforeEach((done: Function) => {
        jasmine.Ajax.install();
        document.body.appendChild(ele);
        ddtreeObj = new DropDownTree({
            fields: {
                dataSource: dataManager1, value: "nodeId", parentValue: 'nodePid', text: "nodeText", hasChildren: "hasChild",
                tooltip: 'nodeTooltip', selected: 'nodeSelected'
            },
            headerTemplate: '<div class="header"><span >HEADER VIA STRING</span></div>',
        });
        ddtreeObj.appendTo(ele);
        setTimeout(function () { done(); });
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            status: 200,
            responseText: JSON.stringify({ d: remoteData2, __count: 2 })
        });
    });
    afterEach(() => {
        if (ele)
            ele.remove();
        document.body.innerHTML = '';
        jasmine.Ajax.uninstall();
    });
    it('functionality testing', (done: Function) => {
        ddtreeObj.showPopup();
        expect(ddtreeObj.headerTemplate).not.toBe(null);
        expect(ddtreeObj.popupObj.element.firstChild.classList.contains('e-ddt-header')).toBe(true);
        expect(ddtreeObj.popupObj.element.firstChild.innerText).toEqual("HEADER VIA STRING");
        ddtreeObj.hidePopup();
        done();
    }, 450);
});
describe('footerTemplate support testing with string', () => {
    let ddtreeObj: any;
    let ele: HTMLElement = createElement('div', { id: 'tree1' });
    let dataManager1: DataManager = new DataManager({ url: '/TreeView/remoteData' });
    beforeEach((done: Function) => {
        jasmine.Ajax.install();
        document.body.appendChild(ele);
        ddtreeObj = new DropDownTree({
            fields: {
                dataSource: dataManager1, value: "nodeId", parentValue: 'nodePid', text: "nodeText", hasChildren: "hasChild",
                tooltip: 'nodeTooltip', selected: 'nodeSelected'
            },
            footerTemplate: '<div class="header"><span >FOOTER VIA STRING</span></div>',
        });
        ddtreeObj.appendTo(ele);
        setTimeout(function () { done(); });
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            status: 200,
            responseText: JSON.stringify({ d: remoteData2, __count: 2 })
        });
    });
    afterEach(() => {
        if (ele)
            ele.remove();
        document.body.innerHTML = '';
        jasmine.Ajax.uninstall();
    });
    it('functionality testing', (done: Function) => {
        ddtreeObj.showPopup();
        expect(ddtreeObj.footerTemplate).not.toBe(null);
        expect(ddtreeObj.popupObj.element.lastElementChild.classList.contains('e-ddt-footer')).toBe(true);
        expect(ddtreeObj.popupObj.element.lastElementChild.innerText).toEqual("FOOTER VIA STRING");
        ddtreeObj.hidePopup();
        done();
    }, 450);
});
describe('itemTemplate support testing with script', () => {
    let mouseEventArgs: any = {
        preventDefault: (): void => { },
        stopImmediatePropagation: (): void => { },
        target: null,
        type: null,
        shiftKey: false,
        ctrlKey: false
    };
    let tapEvent: any = {
        originalEvent: mouseEventArgs,
        tapCount: 1
    };
    let ddtreeObj: any;
    let ele: HTMLElement = createElement('div', { id: 'tree1' });
    let dataManager1: DataManager = new DataManager({ url: '/TreeView/remoteData' });
    beforeEach((done: Function) => {
        jasmine.Ajax.install();
        document.body.appendChild(ele);
        let template: Element = createElement('div', { id: 'template' });
        template.innerHTML = '${if(hasChild == undefined)}<b>${nodeText}</b>${else}<i>${nodeText}</i>${/if}';
        document.body.appendChild(template);
        ddtreeObj = new DropDownTree({
            fields: {
                dataSource: dataManager1, value: "nodeId", parentValue: 'nodePid', text: "nodeText", hasChildren: "hasChild",
                tooltip: 'nodeTooltip', selected: 'nodeSelected',
                child: { dataSource: dataManager1, value: "nodeId", parentValue: 'nodePid', text: "nodeText", }
            },
            itemTemplate: '#template',
        });
        ddtreeObj.appendTo(ele);
        setTimeout(function () { done(); });
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            status: 200,
            responseText: JSON.stringify({ d: remoteData2, __count: 2 })
        });
    });
    afterEach(() => {
        if (ele)
            ele.remove();
        document.body.innerHTML = '';
        jasmine.Ajax.uninstall();
    });
    it('functionality testing', (done: Function) => {
        let txt: Element[] = <Element[] & NodeListOf<Element>>ddtreeObj.treeObj.element.querySelectorAll('.e-text-content');
        expect(txt[0].querySelector('i')).not.toBe(null);
        expect(txt[0].querySelector('b')).toBe(null);
        expect(txt[1].querySelector('b')).not.toBe(null);
        expect(txt[1].querySelector('i')).toBe(null);
        done();
    }, 450);
});
describe('headerTemplate support testing with script', () => {
    let ddtreeObj: any;
    let ele: HTMLElement = createElement('div', { id: 'tree1' });
    let dataManager1: DataManager = new DataManager({ url: '/TreeView/remoteData' });
    beforeEach((done: Function) => {
        jasmine.Ajax.install();
        document.body.appendChild(ele);
        let headerTemplate: Element = createElement('div', { id: 'headerTemplate' });
        headerTemplate.innerHTML = '<div class="header"><span >HEADER Via SCRIPT</span></div>';
        document.body.appendChild(headerTemplate);
        ddtreeObj = new DropDownTree({
            fields: {
                dataSource: dataManager1, value: "nodeId", parentValue: 'nodePid', text: "nodeText", hasChildren: "hasChild",
                tooltip: 'nodeTooltip', selected: 'nodeSelected'
            },
            headerTemplate: '#headerTemplate',
        });
        ddtreeObj.appendTo(ele);
        setTimeout(function () { done(); });
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            status: 200,
            responseText: JSON.stringify({ d: remoteData2, __count: 2 })
        });
    });
    afterEach(() => {
        if (ele)
            ele.remove();
        document.body.innerHTML = '';
        jasmine.Ajax.uninstall();
    });
    it('functionality testing', (done: Function) => {
        ddtreeObj.showPopup();
        expect(ddtreeObj.headerTemplate).not.toBe(null);
        expect(ddtreeObj.popupObj.element.firstChild.classList.contains('e-ddt-header')).toBe(true);
        expect(ddtreeObj.popupObj.element.firstChild.innerText).toEqual("HEADER Via SCRIPT");
        ddtreeObj.hidePopup();
        done();
    }, 450);
});
describe('footerTemplate support testing with script', () => {
    let ddtreeObj: any;
    let ele: HTMLElement = createElement('div', { id: 'tree1' });
    let dataManager1: DataManager = new DataManager({ url: '/TreeView/remoteData' });
    beforeEach((done: Function) => {
        jasmine.Ajax.install();
        document.body.appendChild(ele);
        let footerTemplate: Element = createElement('div', { id: 'footerTemplate' });
        footerTemplate.innerHTML = '<div class="header"><span >FOOTER Via SCRIPT</span></div>';
        document.body.appendChild(footerTemplate);
        ddtreeObj = new DropDownTree({
            fields: {
                dataSource: dataManager1, value: "nodeId", parentValue: 'nodePid', text: "nodeText", hasChildren: "hasChild",
                tooltip: 'nodeTooltip', selected: 'nodeSelected'
            },
            footerTemplate: '#footerTemplate',
        });
        ddtreeObj.appendTo(ele);
        setTimeout(function () { done(); });
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            status: 200,
            responseText: JSON.stringify({ d: remoteData2, __count: 2 })
        });
    });
    afterEach(() => {
        if (ele)
            ele.remove();
        document.body.innerHTML = '';
        jasmine.Ajax.uninstall();
    });
    it('functionality testing', (done: Function) => {
        ddtreeObj.showPopup();
        expect(ddtreeObj.footerTemplate).not.toBe(null);
        expect(ddtreeObj.popupObj.element.lastElementChild.classList.contains('e-ddt-footer')).toBe(true);
        expect(ddtreeObj.popupObj.element.lastElementChild.innerText).toEqual("FOOTER Via SCRIPT");
        ddtreeObj.hidePopup();
        done();
    }, 450);
});

describe('headerTemplate support set model testing', () => {
    let ddtreeObj: any;
    let ele: HTMLElement = createElement('div', { id: 'tree1' });
    let dataManager1: DataManager = new DataManager({ url: '/TreeView/remoteData' });
    beforeEach((done: Function) => {
        jasmine.Ajax.install();
        document.body.appendChild(ele);
        let footerTemplate: Element = createElement('div', { id: 'footerTemplate' });
        footerTemplate.innerHTML = '<div class="header"><span >FOOTER Via SCRIPT</span></div>';
        document.body.appendChild(footerTemplate);
        ddtreeObj = new DropDownTree({
            fields: {
                dataSource: dataManager1, value: "nodeId", parentValue: 'nodePid', text: "nodeText", hasChildren: "hasChild",
                tooltip: 'nodeTooltip', selected: 'nodeSelected'
            }

        });
        ddtreeObj.appendTo(ele);
        setTimeout(function () { done(); });
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            status: 200,
            responseText: JSON.stringify({ d: remoteData2, __count: 2 })
        });
    });
    afterEach(() => {
        if (ele)
            ele.remove();
        document.body.innerHTML = '';
        jasmine.Ajax.uninstall();
    });
    it('functionality testing', (done: Function) => {
        expect(ddtreeObj.headerTemplate).toBe(null);
        ddtreeObj.headerTemplate = '<div class="new headerString"><span>HEADER VIA STRING</span></div>'
        ddtreeObj.dataBind();
        ddtreeObj.showPopup();
        expect(ddtreeObj.headerTemplate).not.toBe(null);
        expect(ddtreeObj.popupObj.element.firstChild.classList.contains('e-ddt-header')).toBe(true);
        expect(ddtreeObj.popupObj.element.firstChild.innerText).toEqual("HEADER VIA STRING");
        ddtreeObj.hidePopup();
        ddtreeObj.headerTemplate = null;
        ddtreeObj.dataBind();
        ddtreeObj.showPopup();
        expect(ddtreeObj.headerTemplate).toBe(null);
        expect(ddtreeObj.popupObj.element.firstChild.classList.contains('e-ddt-header')).toBe(false);
        let headerTemplate: Element = createElement('div', { id: 'headerTemplate' });
        headerTemplate.innerHTML = '<div class="header"><span >HEADER Via SCRIPT</span></div>';
        document.body.appendChild(headerTemplate);
        expect(ddtreeObj.headerTemplate).toBe(null);
        ddtreeObj.headerTemplate = '#headerTemplate';
        ddtreeObj.dataBind();
        ddtreeObj.showPopup();
        expect(ddtreeObj.headerTemplate).not.toBe(null);
        expect(ddtreeObj.popupObj.element.firstChild.classList.contains('e-ddt-header')).toBe(true);
        expect(ddtreeObj.popupObj.element.firstChild.innerText).toEqual("HEADER Via SCRIPT");
        done();
    }, 450);
});

describe('footerTemplate support set model testing', () => {
    let ddtreeObj: any;
    let ele: HTMLElement = createElement('div', { id: 'tree1' });
    let dataManager1: DataManager = new DataManager({ url: '/TreeView/remoteData' });
    beforeEach((done: Function) => {
        jasmine.Ajax.install();
        document.body.appendChild(ele);
        let footerTemplate: Element = createElement('div', { id: 'footerTemplate' });
        footerTemplate.innerHTML = '<div class="header"><span >FOOTER Via SCRIPT</span></div>';
        document.body.appendChild(footerTemplate);
        ddtreeObj = new DropDownTree({
            fields: {
                dataSource: dataManager1, value: "nodeId", parentValue: 'nodePid', text: "nodeText", hasChildren: "hasChild",
                tooltip: 'nodeTooltip', selected: 'nodeSelected'
            }

        });
        ddtreeObj.appendTo(ele);
        setTimeout(function () { done(); });
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            status: 200,
            responseText: JSON.stringify({ d: remoteData2, __count: 2 })
        });
    });
    afterEach(() => {
        if (ele)
            ele.remove();
        document.body.innerHTML = '';
        jasmine.Ajax.uninstall();
    });
    it('functionality testing', (done: Function) => {
        expect(ddtreeObj.footerTemplate).toBe(null);
        ddtreeObj.footerTemplate = '<div class="new headerString"><span>FOOTER VIA STRING</span></div>'
        ddtreeObj.dataBind();
        ddtreeObj.showPopup();
        expect(ddtreeObj.footerTemplate).not.toBe(null);
        expect(ddtreeObj.popupObj.element.lastElementChild.classList.contains('e-ddt-footer')).toBe(true);
        expect(ddtreeObj.popupObj.element.lastElementChild.innerText).toEqual("FOOTER VIA STRING");
        ddtreeObj.hidePopup();
        ddtreeObj.footerTemplate = null;
        ddtreeObj.dataBind();
        ddtreeObj.showPopup();
        expect(ddtreeObj.footerTemplate).toBe(null);
        expect(ddtreeObj.popupObj.element.firstChild.classList.contains('e-ddt-footer')).toBe(false);
        let footerTemplate: Element = createElement('div', { id: 'footerTemplate' });
        footerTemplate.innerHTML = '<div class="footer"><span >FOOTER Via SCRIPT</span></div>';
        document.body.appendChild(footerTemplate);
        expect(ddtreeObj.footerTemplate).toBe(null);
        ddtreeObj.footerTemplate = '#footerTemplate';
        ddtreeObj.dataBind();
        ddtreeObj.showPopup();
        expect(ddtreeObj.footerTemplate).not.toBe(null);
        expect(ddtreeObj.popupObj.element.lastElementChild.classList.contains('e-ddt-footer')).toBe(true);
        expect(ddtreeObj.popupObj.element.lastElementChild.innerText).toEqual("FOOTER Via SCRIPT");
        done();
    }, 450);
});

describe('property change testing', () => {
    let mouseEventArgs: any;
    let tapEvent: any;
    let ddtreeObj: any;
    let dataManager1: DataManager = new DataManager({ url: '/TreeView/remoteData' });
    let dataManager2: DataManager = new DataManager({ url: '/TreeView/remoteData2' });
    let originalTimeout: any;
    beforeEach((done: Function) => {
        mouseEventArgs = {
            preventDefault: (): void => { },
            stopImmediatePropagation: (): void => { },
            target: null,
            type: null,
            shiftKey: false,
            ctrlKey: false
        };
        tapEvent = {
            originalEvent: mouseEventArgs,
            tapCount: 1
        };
        jasmine.Ajax.install();
        let ele: HTMLElement = createElement('input', { id: 'tree1' });
        document.body.appendChild(ele);
        ddtreeObj = new DropDownTree({
            fields: {
                dataSource: dataManager1, value: "nodeId", parentValue: 'nodePid', text: "nodeText", hasChildren: "hasChild",
                iconCss: 'nodeIcon', imageUrl: 'nodeImage', tooltip: 'nodeTooltip', htmlAttributes: 'nodeHtmlAttr', selected: 'nodeSelected'
            },
            treeSettings: { loadOnDemand: true }
        });
        ddtreeObj.appendTo(ele);
        setTimeout(function () { done() });
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            status: 200,
            responseText: JSON.stringify({ d: remoteData2, __count: 2 })
        });
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    afterEach(() => {
        if (ddtreeObj)
            ddtreeObj.destroy();
        document.body.innerHTML = '';
        jasmine.Ajax.uninstall();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    it('dataSource property', (done: Function) => {
        expect(ddtreeObj.treeObj.element.querySelectorAll('li').length).toBe(2);
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-text').innerHTML).toBe('Music');
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').getAttribute('data-uid')).toBe('01');
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-icon').classList.contains('folder')).toBe(true);
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-img').src.indexOf('images/Shooting.png')).not.toBe(-1);
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').title).toBe('This is Music node');
        expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].classList.contains('firstnode')).toBe(true);
        expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].style.backgroundColor).toBe('red');
        ddtreeObj.fields.dataSource = dataManager2;
        ddtreeObj.dataBind();
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            status: 200,
            responseText: JSON.stringify({ d: remoteData1_1, __count: 2 })
        });
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        setTimeout(function () {
            expect(ddtreeObj.treeObj.element.querySelectorAll('li').length).toBe(5);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-text').innerHTML).toBe('Music');
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').getAttribute('data-uid')).toBe('01');
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-icon').classList.contains('folder')).toBe(true);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-img').src.indexOf('images/Shooting.png')).not.toBe(-1);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').title).toBe('This is Music node');
            expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].classList.contains('firstnode')).toBe(true);
            expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].style.backgroundColor).toBe('red');
            done();
        }, 100)
    });
    it('fields text property', (done: Function) => {
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-text').innerHTML).toBe('Music');
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').getAttribute('data-uid')).toBe('01');
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-icon').classList.contains('folder')).toBe(true);
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-img').src.indexOf('images/Shooting.png')).not.toBe(-1);
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').title).toBe('This is Music node');
        expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].classList.contains('firstnode')).toBe(true);
        expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].style.backgroundColor).toBe('red');
        ddtreeObj.fields = { text: 'subText' };
        ddtreeObj.dataBind();
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            status: 200,
            responseText: JSON.stringify({ d: remoteData2, __count: 2 })
        });
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        setTimeout(function () {
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-text').innerHTML).toBe('Pictures');
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').getAttribute('data-uid')).toBe('01');
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-icon').classList.contains('folder')).toBe(true);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-img').src.indexOf('images/Shooting.png')).not.toBe(-1);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').title).toBe('This is Music node');
            expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].classList.contains('firstnode')).toBe(true);
            expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].style.backgroundColor).toBe('red');
            done();
        }, 100);
    });
    it('fields value property', (done: Function) => {
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-text').innerHTML).toBe('Music');
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').getAttribute('data-uid')).toBe('01');
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-icon').classList.contains('folder')).toBe(true);
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-img').src.indexOf('images/Shooting.png')).not.toBe(-1);
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').title).toBe('This is Music node');
        expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].classList.contains('firstnode')).toBe(true);
        expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].style.backgroundColor).toBe('red');
        ddtreeObj.fields = { value: 'subId' };
        ddtreeObj.dataBind();
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            status: 200,
            responseText: JSON.stringify({ d: remoteData2, __count: 2 })
        });
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        setTimeout(function () {
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-text').innerHTML).toBe('Music');
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').getAttribute('data-uid')).toBe('21');
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-icon').classList.contains('folder')).toBe(true);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-img').src.indexOf('images/Shooting.png')).not.toBe(-1);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').title).toBe('This is Music node');
            expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].classList.contains('firstnode')).toBe(true);
            expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].style.backgroundColor).toBe('red');
            done();
        }, 100);
    });
    it('fields iconCss property', (done: Function) => {
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-text').innerHTML).toBe('Music');
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').getAttribute('data-uid')).toBe('01');
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-icon').classList.contains('folder')).toBe(true);
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-img').src.indexOf('images/Shooting.png')).not.toBe(-1);
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').title).toBe('This is Music node');
        expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].classList.contains('firstnode')).toBe(true);
        expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].style.backgroundColor).toBe('red');
        ddtreeObj.fields = { iconCss: 'subIcon' };
        ddtreeObj.dataBind();
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            status: 200,
            responseText: JSON.stringify({ d: remoteData2, __count: 2 })
        });
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        setTimeout(function () {
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-text').innerHTML).toBe('Music');
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').getAttribute('data-uid')).toBe('01');
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-icon').classList.contains('file')).toBe(true);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-img').src.indexOf('images/Shooting.png')).not.toBe(-1);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').title).toBe('This is Music node');
            expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].classList.contains('firstnode')).toBe(true);
            expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].style.backgroundColor).toBe('red');
            done();
        }, 100);
    });
    it('fields imageUrl property', (done: Function) => {
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-text').innerHTML).toBe('Music');
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').getAttribute('data-uid')).toBe('01');
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-icon').classList.contains('folder')).toBe(true);
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-img').src.indexOf('images/Shooting.png')).not.toBe(-1);
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').title).toBe('This is Music node');
        expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].classList.contains('firstnode')).toBe(true);
        expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].style.backgroundColor).toBe('red');
        ddtreeObj.fields = { imageUrl: 'subImage' };
        ddtreeObj.dataBind();
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            status: 200,
            responseText: JSON.stringify({ d: remoteData2, __count: 2 })
        });
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        setTimeout(function () {
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-text').innerHTML).toBe('Music');
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').getAttribute('data-uid')).toBe('01');
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-icon').classList.contains('folder')).toBe(true);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-img').src.indexOf('images/Cricket.png')).not.toBe(-1);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').title).toBe('This is Music node');
            expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].classList.contains('firstnode')).toBe(true);
            expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].style.backgroundColor).toBe('red');
            done();
        }, 100);
    });
    it('fields tooltip property', (done: Function) => {
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-text').innerHTML).toBe('Music');
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').getAttribute('data-uid')).toBe('01');
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-icon').classList.contains('folder')).toBe(true);
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-img').src.indexOf('images/Shooting.png')).not.toBe(-1);
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').title).toBe('This is Music node');
        expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].classList.contains('firstnode')).toBe(true);
        expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].style.backgroundColor).toBe('red');
        ddtreeObj.fields = { tooltip: 'subTooltip' };
        ddtreeObj.dataBind();
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            status: 200,
            responseText: JSON.stringify({ d: remoteData2, __count: 2 })
        });
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        setTimeout(function () {
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-text').innerHTML).toBe('Music');
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').getAttribute('data-uid')).toBe('01');
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-icon').classList.contains('folder')).toBe(true);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-img').src.indexOf('images/Shooting.png')).not.toBe(-1);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').title).toBe('This is Pictures node');
            expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].classList.contains('firstnode')).toBe(true);
            expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].style.backgroundColor).toBe('red');
            done();
        }, 100);
    });
    it('fields htmlAttributes property', (done: Function) => {
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-text').innerHTML).toBe('Music');
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').getAttribute('data-uid')).toBe('01');
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-icon').classList.contains('folder')).toBe(true);
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-img').src.indexOf('images/Shooting.png')).not.toBe(-1);
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').title).toBe('This is Music node');
        expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].classList.contains('firstnode')).toBe(true);
        expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].style.backgroundColor).toBe('red');
        ddtreeObj.fields = { htmlAttributes: 'subHtmlAttr' };
        ddtreeObj.dataBind();
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            status: 200,
            responseText: JSON.stringify({ d: remoteData2, __count: 2 })
        });
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        setTimeout(function () {
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-text').innerHTML).toBe('Music');
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').getAttribute('data-uid')).toBe('01');
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-icon').classList.contains('folder')).toBe(true);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-img').src.indexOf('images/Shooting.png')).not.toBe(-1);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').title).toBe('This is Music node');
            expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].classList.contains('customnode')).toBe(true);
            expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].style.backgroundColor).toBe('blue');
            done();
        }, 100);
    });
    it('fields selected property', (done: Function) => {
        expect(ddtreeObj.treeObj.element.querySelectorAll('li').length).toBe(2);
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-text').innerHTML).toBe('Music');
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').getAttribute('data-uid')).toBe('01');
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-icon').classList.contains('folder')).toBe(true);
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-img').src.indexOf('images/Shooting.png')).not.toBe(-1);
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').title).toBe('This is Music node');
        expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').classList.contains('e-active')).toBe(true);
        expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].classList.contains('e-active')).toBe(false);
        expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].classList.contains('firstnode')).toBe(true);
        expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].style.backgroundColor).toBe('red');
        ddtreeObj.fields = { selected: 'subSelected' };
        ddtreeObj.dataBind();
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            status: 200,
            responseText: JSON.stringify({ d: remoteData2, __count: 2 })
        });
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        setTimeout(function () {
            expect(ddtreeObj.treeObj.element.querySelectorAll('li').length).toBe(2);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-text').innerHTML).toBe('Music');
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').getAttribute('data-uid')).toBe('01');
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-icon').classList.contains('folder')).toBe(true);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-img').src.indexOf('images/Shooting.png')).not.toBe(-1);
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').title).toBe('This is Music node');
            expect(ddtreeObj.treeObj.element.querySelector('.e-list-item').classList.contains('e-active')).toBe(false);
            expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].classList.contains('e-active')).toBe(true);
            expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].classList.contains('firstnode')).toBe(true);
            expect(ddtreeObj.treeObj.element.querySelectorAll('li')[1].style.backgroundColor).toBe('red');
            done();
        }, 100);
    });
    it('sortOrder property testing', (done: Function) => {
        let li: Element[] = <Element[] & NodeListOf<Element>>ddtreeObj.treeObj.element.querySelectorAll('li');
        expect(li.length).toBe(2);
        expect(li[0].querySelector('.e-list-text').innerHTML).toBe('Music');
        expect(li[0].getAttribute('data-uid')).toBe('01');
        ddtreeObj.sortOrder = 'Ascending';
        ddtreeObj.dataBind();
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            status: 200,
            responseText: JSON.stringify({d: remoteData2_1, __count: 2})
        });
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        setTimeout(function() {
            let li1: Element[] = <Element[] & NodeListOf<Element>>ddtreeObj.treeObj.element.querySelectorAll('li');
            expect(li1.length).toBe(2);
            expect(li1[0].querySelector('.e-list-text').innerHTML).toBe('Downloads');
            expect(li1[0].getAttribute('data-uid')).toBe('02');
            ddtreeObj.sortOrder = 'Descending';
            ddtreeObj.dataBind();
            this.request = jasmine.Ajax.requests.mostRecent();
            this.request.respondWith({
                status: 200,
                responseText: JSON.stringify({d: remoteData2, __count: 2})
            });
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            setTimeout(function() {
                let li2: Element[] = <Element[] & NodeListOf<Element>>ddtreeObj.treeObj.element.querySelectorAll('li');
                expect(li2.length).toBe(2);
                expect(li2[0].querySelector('.e-list-text').innerHTML).toBe('Music');
                expect(li2[0].getAttribute('data-uid')).toBe('01');
                ddtreeObj.sortOrder = 'Ascending';
                ddtreeObj.dataBind();
                this.request = jasmine.Ajax.requests.mostRecent();
                this.request.respondWith({
                    status: 200,
                    responseText: JSON.stringify({d: remoteData2_1, __count: 2})
                });
                jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
                setTimeout(function() {
                    let li3: Element[] = <Element[] & NodeListOf<Element>>ddtreeObj.treeObj.element.querySelectorAll('li');
                    expect(li3.length).toBe(2);
                    expect(li3[0].querySelector('.e-list-text').innerHTML).toBe('Downloads');
                    expect(li3[0].getAttribute('data-uid')).toBe('02');
                    ddtreeObj.sortOrder = 'None';
                    ddtreeObj.dataBind();
                    this.request = jasmine.Ajax.requests.mostRecent();
                    this.request.respondWith({
                        status: 200,
                        responseText: JSON.stringify({d: remoteData2, __count: 2})
                    });
                    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
                    setTimeout(function() {
                        let li4: Element[] = <Element[] & NodeListOf<Element>>ddtreeObj.treeObj.element.querySelectorAll('li');
                        expect(li4.length).toBe(2);
                        expect(li4[0].querySelector('.e-list-text').innerHTML).toBe('Music');
                        expect(li4[0].getAttribute('data-uid')).toBe('01');
                        done();
                    }, 100);
                }, 100);
            }, 100);
        }, 100);
    });


    it('itemTemplate property testing', (done: Function) => {
        let template: Element = createElement('div', { id: 'template' });
        template.innerHTML = '${if(hasChild == undefined)}<b>${nodeText}</b>${else}<i>${nodeText}</i>${/if}';
        document.body.appendChild(template);
        let li: Element[] = <Element[] & NodeListOf<Element>>ddtreeObj.treeObj.element.querySelectorAll('.e-text-content');
        expect(li[0].querySelector('i')).toBe(null);
        expect(li[0].querySelector('b')).toBe(null);
        ddtreeObj.itemTemplate = 'template';
        ddtreeObj.dataBind();
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            status: 200,
            responseText: JSON.stringify({ d: remoteData2, __count: 2 })
        });
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        setTimeout(function () {
            let nli: Element[] = <Element[] & NodeListOf<Element>>ddtreeObj.treeObj.element.querySelectorAll('.e-text-content');
            expect(nli[0].querySelector('i')).toBe(null);
            expect(nli[0].querySelector('b')).toBe(null);
            ddtreeObj.itemTemplate = null;
            ddtreeObj.dataBind();
            this.request = jasmine.Ajax.requests.mostRecent();
            this.request.respondWith({
                status: 200,
                responseText: JSON.stringify({ d: remoteData2, __count: 2 })
            });
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            setTimeout(function () {
                let mli: Element[] = <Element[] & NodeListOf<Element>>ddtreeObj.treeObj.element.querySelectorAll('.e-text-content');
                expect(mli[0].querySelector('i')).toBe(null);
                expect(mli[0].querySelector('b')).toBe(null);
                ddtreeObj.itemTemplate = '#template';
                ddtreeObj.dataBind();
                this.request = jasmine.Ajax.requests.mostRecent();
                this.request.respondWith({
                    status: 200,
                    responseText: JSON.stringify({ d: remoteData2, __count: 2 })
                });
                jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
                setTimeout(function () {
                    let ali: Element[] = <Element[] & NodeListOf<Element>>ddtreeObj.treeObj.element.querySelectorAll('.e-text-content');
                    expect(ali[0].querySelector('i')).not.toBe(null);
                    expect(ali[0].querySelector('b')).toBe(null);
                    ddtreeObj.itemTemplate = '${if(hasChild == undefined)}<b>${nodeText}</b>${else}<i>${nodeText}</i>${/if}';
                    ddtreeObj.dataBind();
                    this.request = jasmine.Ajax.requests.mostRecent();
                    this.request.respondWith({
                        status: 200,
                        responseText: JSON.stringify({ d: remoteData2, __count: 2 })
                    });
                    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
                    setTimeout(function () {
                        let bli: Element[] = <Element[] & NodeListOf<Element>>ddtreeObj.treeObj.element.querySelectorAll('.e-text-content');
                        expect(bli[0].querySelector('i')).not.toBe(null);
                        expect(bli[0].querySelector('b')).toBe(null);
                        done();
                    }, 450);
                }, 450);
            }, 450);
        }, 450);
    });

});
describe('allowMultiSelection true', () => {
    let mouseEventArgs: any;
    let tapEvent: any;
    let ddtreeObj: any;
    let dataManager1: DataManager = new DataManager({ url: '/TreeView/remoteData' });
    let originalTimeout: any;
    beforeEach((done: Function) => {
        mouseEventArgs = {
            preventDefault: (): void => { },
            stopImmediatePropagation: (): void => { },
            target: null,
            type: null,
            shiftKey: false,
            ctrlKey: false
        };
        tapEvent = {
            originalEvent: mouseEventArgs,
            tapCount: 1
        };
        jasmine.Ajax.install();
        let ele: HTMLElement = createElement('input', { id: 'tree1' });
        document.body.appendChild(ele);
        ddtreeObj = new DropDownTree({
            fields: {
                dataSource: dataManager1, value: "nodeId", parentValue: 'nodePid', text: "nodeText", hasChildren: "hasChild",
                iconCss: 'nodeIcon', imageUrl: 'nodeImage', tooltip: 'nodeTooltip', htmlAttributes: 'nodeHtmlAttr', selected: 'nodeSelected'
            },
            treeSettings: { loadOnDemand: true },
            allowMultiSelection: true
        });
        ddtreeObj.appendTo(ele);
        setTimeout(function () { done() });
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            status: 200,
            responseText: JSON.stringify({ d: remoteData2, __count: 2 })
        });
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    afterEach(() => {
        if (ddtreeObj)
            ddtreeObj.destroy();
        document.body.innerHTML = '';
        jasmine.Ajax.uninstall();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    it('With Default Mode', () => {
        let ele = ddtreeObj.element;
        var e = new MouseEvent("mousedown", { view: window, bubbles: true, cancelable: true });
        ele.dispatchEvent(e);
        var e = new MouseEvent("mouseup", { view: window, bubbles: true, cancelable: true });
        ele.dispatchEvent(e);
        var e = new MouseEvent("click", { view: window, bubbles: true, cancelable: true });
        ele.dispatchEvent(e);
        let li: Element[] = <Element[] & NodeListOf<Element>>(ddtreeObj as any).treeObj.element.querySelectorAll('li');
        expect(ddtreeObj.treeObj.element.querySelectorAll('li').length).toBe(2);
        mouseEventArgs.ctrlKey = true;
        mouseEventArgs.target = li[0].querySelector('.e-list-text');
        (ddtreeObj as any).treeObj.touchClickObj.tap(tapEvent);
        mouseEventArgs.target = li[0].querySelector('.e-list-text');
        (ddtreeObj as any).treeObj.touchClickObj.tap(tapEvent);
        expect(li[0].classList.contains('e-active')).toBe(true);
        expect(ddtreeObj.text).toBe('Music');
        expect(ddtreeObj.value[0]).toBe('01');
        var chipElement = ddtreeObj.element.parentElement.firstElementChild;
        expect(chipElement.classList.contains('e-chips-wrapper')).toBe(true);
        var chips = chipElement.querySelectorAll('.e-chips');
        expect(chips.length).toBe(1);
        expect(chips[0].getAttribute("data-value")).toBe("01");
        expect(chips[0].querySelector(".e-chipcontent").textContent).toBe("Music");
        expect(document.querySelector('.e-popup').classList.contains('e-popup-open')).toBe(true);
        mouseEventArgs.ctrlKey = true;
        mouseEventArgs.target = li[1].querySelector('.e-list-text');
        (ddtreeObj as any).treeObj.touchClickObj.tap(tapEvent);
        expect(ddtreeObj.text).toBe('Music,Downloads');
        expect(ddtreeObj.value.length).toBe(2);
        var nchips = chipElement.querySelectorAll('.e-chips');
        expect(nchips.length).toBe(2);
        ddtreeObj.onFocusOut();
        expect(ddtreeObj.text).toBe('Music,Downloads');
        expect(chipElement.classList.contains('e-icon-hide')).toBe(true);
        ddtreeObj.showPopup();
        expect(chipElement.classList.contains('e-icon-hide')).toBe(false);
        ddtreeObj.allowMultiSelection = false;
        ddtreeObj.dataBind();
        expect(ddtreeObj.text).toBe('Music');
        expect(ddtreeObj.value.length).toBe(1);
        ddtreeObj.showPopup();
        mouseEventArgs.target = li[1].querySelector('.e-list-text');
        (ddtreeObj as any).treeObj.touchClickObj.tap(tapEvent);
        expect(document.querySelector('.e-popup').classList.contains('e-popup-close')).toBe(true);
    });
});
describe('actionFailure Event Testing and actionFailureTemplate testing for remote data', () => {
    let count = 0;
    function actionFailedFunction() {
        count++;
    }
    let dataManager1: DataManager = new DataManager({ url: '/TreeView/remoteData11111' });
    let originalTimeout: any;

    let ddtreeObj: any;
    beforeEach((done: Function) => {
        setCulture('en-US')
        jasmine.Ajax.install();
        let ele: HTMLElement = createElement('input', { id: 'tree1' });
        document.body.appendChild(ele);
        ddtreeObj = new DropDownTree({
            fields: {
                dataSource: dataManager1, value: "nodeId", parentValue: 'nodePid', text: "nodeText", hasChildren: "hasChild",
                tooltip: 'nodeTooltip', selected: 'nodeSelected'
            },
            actionFailure: actionFailedFunction
        });
        ddtreeObj.appendTo(ele);
        setTimeout(function () { done(); });
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            'status': 404,
            'contentType': 'application/json',
            'responseText': 'Page not found'
        });
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    afterEach(() => {
        if (ddtreeObj)
            ddtreeObj.destroy();
        document.body.innerHTML = '';
        jasmine.Ajax.uninstall();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    it('actionFailure testing', () => {
        expect(count).toBe(1);
    });
    it('actionFailureTemplate testing with default value', () => {
        ddtreeObj.showPopup();
        expect(ddtreeObj.popupObj.element.firstElementChild.classList.contains('e-no-data')).toBe(true);
        expect(ddtreeObj.popupObj.element.firstElementChild.innerText).toBe('The Request Failed');
    });
});
describe('actionFailureTemplate testing for remote data', () => {
    let dataManager1: DataManager = new DataManager({ url: '/TreeView/remoteData11111' });
    let originalTimeout: any;

    let ddtreeObj: any;
    beforeEach((done: Function) => {
        jasmine.Ajax.install();
        let ele: HTMLElement = createElement('input', { id: 'tree1' });
        document.body.appendChild(ele);
        ddtreeObj = new DropDownTree({
            fields: {
                dataSource: dataManager1, value: "nodeId", parentValue: 'nodePid', text: "nodeText", hasChildren: "hasChild",
                tooltip: 'nodeTooltip', selected: 'nodeSelected'
            },
            actionFailureTemplate: '<div><span>Server exception: 404 Not found</span></div>'
        });
        ddtreeObj.appendTo(ele);
        setTimeout(function () { done(); });
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            'status': 404,
            'contentType': 'application/json',
            'responseText': 'Page not found'
        });
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    afterEach(() => {
        if (ddtreeObj)
            ddtreeObj.destroy();
        document.body.innerHTML = '';
        jasmine.Ajax.uninstall();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    it('with custom value', () => {
        ddtreeObj.showPopup();
        expect(ddtreeObj.popupObj.element.firstElementChild.classList.contains('e-no-data')).toBe(true);
        expect(ddtreeObj.popupObj.element.firstElementChild.innerText).toBe('Server exception: 404 Not found');
    });
});
describe('actionFailureTemplate testing for remote data', () => {
    let dataManager1: DataManager = new DataManager({ url: '/TreeView/remoteData11111' });
    let originalTimeout: any;
    let ddtreeObj: any;
    beforeEach((done: Function) => {
        jasmine.Ajax.install();
        let ele: HTMLElement = createElement('input', { id: 'tree1' });
        document.body.appendChild(ele);
        let actionTemplate: Element = createElement('div', { id: 'actionTemplate' });
        actionTemplate.innerHTML = '<div><span>There is no record found</span></div>';
        document.body.appendChild(actionTemplate);
        ddtreeObj = new DropDownTree({
            fields: {
                dataSource: dataManager1, value: "nodeId", parentValue: 'nodePid', text: "nodeText", hasChildren: "hasChild",
                tooltip: 'nodeTooltip', selected: 'nodeSelected'
            },
            actionFailureTemplate: '#actionTemplate'
        });
        ddtreeObj.appendTo(ele);
        setTimeout(function () { done(); });
        this.request = jasmine.Ajax.requests.mostRecent();
        this.request.respondWith({
            'status': 404,
            'contentType': 'application/json',
            'responseText': 'Page not found'
        });
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    afterEach(() => {
        if (ddtreeObj)
            ddtreeObj.destroy();
        document.body.innerHTML = '';
        jasmine.Ajax.uninstall();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    it('with script tag', () => {
        ddtreeObj.showPopup();
        expect(ddtreeObj.popupObj.element.firstElementChild.classList.contains('e-no-data')).toBe(true);
        expect(ddtreeObj.popupObj.element.firstElementChild.innerText).toBe('There is no record found');
        ddtreeObj.onFocusOut();
        ddtreeObj.actionFailureTemplate = '404 Not found';
        ddtreeObj.dataBind();
        ddtreeObj.showPopup();
        expect(ddtreeObj.popupObj.element.firstElementChild.innerText).toBe('404 Not found');
    });
});