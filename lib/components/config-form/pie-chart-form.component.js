var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EColType, EAggregation } from 'mm-dashboard-core';
import { PieChartConfigFactory } from '../../services';
var PieChartFormComponent = (function () {
    function PieChartFormComponent(formBuilder, configFactory) {
        this.formBuilder = formBuilder;
        this.configFactory = configFactory;
        this.configChange = new EventEmitter();
        this.colTypes = EColType;
        this.aggregations = EAggregation;
    }
    PieChartFormComponent.prototype.ngOnInit = function () {
        this.initFormAndListen();
    };
    PieChartFormComponent.prototype.ngOnChanges = function (changes) {
        console.log("PieChartFormComponent->ngOnChanges: ", changes);
        if (changes) {
            // console.log("do nothing");
            this.initFormAndListen();
        }
    };
    PieChartFormComponent.prototype.initFormAndListen = function () {
        var _this = this;
        this.form = this.initForm(this.config);
        this.form.valueChanges.subscribe(function (config) {
            _this.configChange.emit(_this.configFactory.init(config));
        });
    };
    PieChartFormComponent.prototype.initForm = function (conf) {
        console.log("Initiating form ...");
        conf = this.configFactory.init(conf);
        console.log("with configuration: ", conf);
        var fg = this.formBuilder.group({
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
    };
    PieChartFormComponent.prototype.initColors = function (colors) {
        var _this = this;
        var formGroups = new Array();
        colors.forEach(function (c) {
            formGroups.push(_this.formBuilder.control([c]));
        });
        console.log("initiating colors: ", colors);
        return formGroups;
    };
    PieChartFormComponent.prototype.groupByTransferSuccess = function (event) {
        console.log("setting groupBy col name", event);
        this.form.controls['groupByCol'].patchValue(event.dragData);
    };
    PieChartFormComponent.prototype.groupValueTransferSuccess = function (event) {
        console.log("setting groupValue col name", event);
        this.form.controls['groupValueCol'].patchValue(event.dragData);
    };
    PieChartFormComponent.prototype.onColorChange = function (colors) {
        console.log("colors changed to: ", colors);
        this.form.controls["colors"].push(this.formBuilder.control(colors[colors.length - 1]));
        // let formColors = <FormArray>this.form.controls["colors"];
        // formColors = new FormArray([]);
        // colors.forEach(c => formColors.push(this.formBuilder.control(c)));
        // this.config.colors = colors;
        // this.configChange.emit(this.config);
    };
    return PieChartFormComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieChartFormComponent.prototype, "config", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], PieChartFormComponent.prototype, "configChange", void 0);
PieChartFormComponent = __decorate([
    Component({
        selector: 'mm-pie-chart-form',
        template: "\n    <div class=\"mm-chart-form\" [formGroup]=\"form\">\n        <div>\n            <label>Chart Name</label>\n            <input type=\"text\" formControlName=\"title\">\n        </div>\n        <div formArrayName=\"colors\">\n            <label>Selected Color</label>\n            <mm-multi-color-selector [colors]=\"config.colors\" (colorsChange)=\"onColorChange($event)\"></mm-multi-color-selector>\n            <div *ngFor=\"let color of form.controls.colors.controls; let i = index\">\n                <input [style.display]=\"'none'\" type=\"text\" formControlName=\"{{i}}\">\n            </div>\n        </div>\n        <div formGroupName=\"groupByCol\">\n            <label>Group On column</label>\n            <input dnd-droppable (onDropSuccess)=\"groupByTransferSuccess($event)\" type=\"text\" formControlName=\"label\">\n            <input type=\"text\" formControlName=\"name\" [style.display]=\"'none'\">\n            <input type=\"text\" formControlName=\"type\" [style.display]=\"'none'\">\n        </div>\n        <div formGroupName=\"groupValueCol\">\n            <label>Group Value column</label>\n            <input dnd-droppable (onDropSuccess)=\"groupValueTransferSuccess($event)\" type=\"text\" formControlName=\"label\">\n            <input type=\"text\" formControlName=\"name\" [style.display]=\"'none'\">\n            <input type=\"text\" formControlName=\"type\" [style.display]=\"'none'\">\n        </div>\n        <div>\n            <label>Aggregation type</label>\n            <select formControlName=\"aggregation\">\n                <option *ngFor=\"let agg of aggregations | EKeys\" [ngValue]=\"agg.key\">{{agg.value}}</option>\n            </select>\n        </div>\n    </div>\n    ",
        styles: [
            "\n        \n        "
        ]
    }),
    __metadata("design:paramtypes", [FormBuilder,
        PieChartConfigFactory])
], PieChartFormComponent);
export { PieChartFormComponent };
//# sourceMappingURL=C:/_user/Code/dashboard/mm-pie-chart/src/components/config-form/pie-chart-form.component.js.map