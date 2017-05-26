import { Component, SimpleChanges, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { EColType, EAggregation, IBaseWidgetForm } from 'mm-dashboard-core';
import { IColor, IPieChartConfig } from '../../interfaces';
import { PieChartConfigFactory } from '../../services';

@Component({
    selector: 'mm-pie-chart-form',
    template: `
    <div class="mm-chart-form" [formGroup]="form">
        <div>
            <label>Chart Name</label>
            <input type="text" formControlName="title">
        </div>
        <div formArrayName="colors">
            <label>Selected Color</label>
            <mm-multi-color-selector [colors]="config.colors" (colorsChange)="onColorChange($event)"></mm-multi-color-selector>
            <div *ngFor="let color of form.controls.colors.controls; let i = index">
                <input [style.display]="'none'" type="text" formControlName="{{i}}">
            </div>
        </div>
        <div formGroupName="groupByCol">
            <label>Group On column</label>
            <input dnd-droppable (onDropSuccess)="groupByTransferSuccess($event)" type="text" formControlName="label">
            <input type="text" formControlName="name" [style.display]="'none'">
            <input type="text" formControlName="type" [style.display]="'none'">
        </div>
        <div formGroupName="groupValueCol">
            <label>Group Value column</label>
            <input dnd-droppable (onDropSuccess)="groupValueTransferSuccess($event)" type="text" formControlName="label">
            <input type="text" formControlName="name" [style.display]="'none'">
            <input type="text" formControlName="type" [style.display]="'none'">
        </div>
        <div>
            <label>Aggregation type</label>
            <select formControlName="aggregation">
                <option *ngFor="let agg of aggregations | EKeys" [ngValue]="agg.key">{{agg.value}}</option>
            </select>
        </div>
    </div>
    `,
    styles: [
        `
        
        `
    ]

})
export class PieChartFormComponent implements OnInit, OnChanges, IBaseWidgetForm {
    @Input() config: IPieChartConfig;
    @Output() configChange: EventEmitter<IPieChartConfig> = new EventEmitter<IPieChartConfig>();

    form: FormGroup;
    colTypes: any;
    aggregations: any;

    constructor(private formBuilder: FormBuilder,
        private configFactory: PieChartConfigFactory) {
        this.colTypes = EColType;
        this.aggregations = EAggregation;
    }

    ngOnInit() {
        this.initFormAndListen();
    }

    ngOnChanges(changes?: SimpleChanges) {
        console.log("PieChartFormComponent->ngOnChanges: ", changes);
        if (changes) {
            // console.log("do nothing");
            this.initFormAndListen();
        }
    }

    initFormAndListen() {
        this.form = this.initForm(this.config);

        this.form.valueChanges.subscribe(
            (config: IPieChartConfig) => {
                this.configChange.emit(this.configFactory.init(config));
            }
        );
    }

    initForm(conf: IPieChartConfig): FormGroup {
        console.log("Initiating form ...");
        conf = this.configFactory.init(conf);
        console.log("with configuration: ", conf);
        let fg = this.formBuilder.group({
            title: [conf.title],
            colors: this.formBuilder.array(this.initColors(conf.colors)),
            aggregation: [conf.aggregation],
            groupByCol: this.formBuilder.group({
                label: [conf.groupByCol.label],
                name: [conf.groupByCol.name],
                type: [conf.groupByCol.type]
            }),
            groupValueCol: this.formBuilder.group({
                label: [conf.groupValueCol.label],
                name: [conf.groupValueCol.name],
                type: [conf.groupValueCol.type]
            })
        });
        return fg;
    }

    initColors(colors: Array<string>): Array<FormControl> {
        let formGroups: Array<FormControl> = new Array<FormControl>();

        colors.forEach(c => {
            formGroups.push(this.formBuilder.control([c]));
        })
        console.log("initiating colors: ", colors);
        return formGroups;
    }

    groupByTransferSuccess(event) {
        console.log("setting groupBy col name", event);
        this.form.controls['groupByCol'].patchValue(event.dragData);
    }

    groupValueTransferSuccess(event) {
        console.log("setting groupValue col name", event);
        this.form.controls['groupValueCol'].patchValue(event.dragData);
    }

    onColorChange(colors: Array<string>) {
        console.log("colors changed to: ", colors);
        (<FormArray>this.form.controls["colors"]).push(this.formBuilder.control(colors[colors.length - 1]));
        // let formColors = <FormArray>this.form.controls["colors"];
        // formColors = new FormArray([]);
        // colors.forEach(c => formColors.push(this.formBuilder.control(c)));
        // this.config.colors = colors;
        // this.configChange.emit(this.config);
    }


}