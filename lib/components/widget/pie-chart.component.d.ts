import { OnInit, OnChanges, AfterViewInit, EventEmitter, ElementRef, SimpleChanges } from '@angular/core';
import { IColumn, IBaseWidget, DataFormater, ITooltipConfig } from 'mm-dashboard-core';
import { IPieChartConfig } from '../../interfaces';
export declare class PieChartComponent implements IBaseWidget, OnInit, OnChanges, AfterViewInit {
    private dataFormater;
    private element;
    resized: boolean;
    config: IPieChartConfig;
    data: Array<any>;
    dataChange: EventEmitter<any[]>;
    tooltipOn: EventEmitter<ITooltipConfig>;
    tooltipOff: EventEmitter<ITooltipConfig>;
    htmlElem: HTMLElement;
    barData: Array<any>;
    d3Svg: any;
    viewInit: boolean;
    constructor(dataFormater: DataFormater, element: ElementRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    formatData(): void;
    onDblclick(col: IColumn, value: any): void;
    draw(): void;
}
