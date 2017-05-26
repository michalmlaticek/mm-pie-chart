var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { EAggregation, MmObjectFactory, } from 'mm-dashboard-core';
var PieChartConfigFactory = (function () {
    function PieChartConfigFactory(objectFactory) {
        this.objectFactory = objectFactory;
        this.defaultConfig = {
            widgetId: "PieChart",
            widgetLabel: "Pie Chart",
            widgetDescription: "",
            title: "",
            margin: { top: 20, right: 20, bottom: 20, left: 40 },
            colors: new Array(),
            aggregation: EAggregation.count,
            groupByCol: {
                label: null,
                name: null,
                type: null
            },
            groupValueCol: {
                label: null,
                name: null,
                type: null
            }
        };
    }
    PieChartConfigFactory.prototype.init = function (config) {
        return this.objectFactory.init(this.defaultConfig, config);
    };
    return PieChartConfigFactory;
}());
PieChartConfigFactory = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [MmObjectFactory])
], PieChartConfigFactory);
export { PieChartConfigFactory };
//# sourceMappingURL=C:/_user/Code/dashboard/mm-pie-chart/src/services/pie-chart-config.factory.js.map