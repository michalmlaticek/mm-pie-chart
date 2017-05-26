var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardCoreModule } from 'mm-dashboard-core';
import { DndModule } from 'ng2-dnd';
import { PieChartConfigFactory } from './services';
import { PieChartComponent, PieChartFormComponent } from './components';
var PieChartModule = PieChartModule_1 = (function () {
    function PieChartModule() {
    }
    PieChartModule.forRoot = function () {
        return {
            ngModule: PieChartModule_1,
            providers: [
                { provide: PieChartConfigFactory, useClass: PieChartConfigFactory }
            ]
        };
    };
    PieChartModule.forChild = function () {
        // widget service will need to be provided in the root module
        return {
            ngModule: PieChartModule_1,
            providers: [
                { provide: PieChartConfigFactory, useClass: PieChartConfigFactory }
            ]
        };
    };
    return PieChartModule;
}());
PieChartModule = PieChartModule_1 = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ReactiveFormsModule,
            DndModule.forRoot(),
            DashboardCoreModule.forChild()
        ],
        declarations: [PieChartComponent, PieChartFormComponent],
        exports: [PieChartComponent, PieChartFormComponent],
        entryComponents: [PieChartComponent, PieChartFormComponent]
    })
], PieChartModule);
export { PieChartModule };
var PieChartModule_1;
//# sourceMappingURL=C:/_user/Code/dashboard/mm-pie-chart/src/pie-chart.module.js.map