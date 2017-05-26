import { SimpleChanges, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IBaseWidgetForm } from 'mm-dashboard-core';
import { IPieChartConfig } from '../../interfaces';
import { PieChartConfigFactory } from '../../services';
export declare class PieChartFormComponent implements OnInit, OnChanges, IBaseWidgetForm {
    private formBuilder;
    private configFactory;
    config: IPieChartConfig;
    configChange: EventEmitter<IPieChartConfig>;
    form: FormGroup;
    colTypes: any;
    aggregations: any;
    constructor(formBuilder: FormBuilder, configFactory: PieChartConfigFactory);
    ngOnInit(): void;
    ngOnChanges(changes?: SimpleChanges): void;
    initFormAndListen(): void;
    initForm(conf: IPieChartConfig): FormGroup;
    initColors(colors: Array<string>): Array<FormControl>;
    groupByTransferSuccess(event: any): void;
    groupValueTransferSuccess(event: any): void;
    onColorChange(colors: Array<string>): void;
}
