import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardCoreModule } from 'mm-dashboard-core';
import { DndModule } from 'ng2-dnd';

import { PieChartConfigFactory } from './services';
import { PieChartComponent, PieChartFormComponent } from './components';

@NgModule({
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
export class PieChartModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: PieChartModule,
            providers: [
                { provide: PieChartConfigFactory, useClass: PieChartConfigFactory }
            ]
        };
    }

    static forChild(): ModuleWithProviders {
        // widget service will need to be provided in the root module
        return {
            ngModule: PieChartModule,
            providers: [
                { provide: PieChartConfigFactory, useClass: PieChartConfigFactory }
            ]
        };
    }
}