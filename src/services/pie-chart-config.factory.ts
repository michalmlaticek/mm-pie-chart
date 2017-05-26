import { Injectable } from '@angular/core';
import { EColType, EAggregation, IMargin, MmObjectFactory, } from 'mm-dashboard-core';
import { IPieChartConfig } from '../interfaces';

@Injectable()
export class PieChartConfigFactory {

    defaultConfig: IPieChartConfig = {
        widgetId: "PieChart",
        widgetLabel: "Pie Chart",
        widgetDescription: "",
        title: "",
        margin: <IMargin>{ top: 20, right: 20, bottom: 20, left: 40 },

        colors: new Array<string>(),
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
    }

    constructor(private objectFactory: MmObjectFactory<IPieChartConfig>) { }

    init(config?: IPieChartConfig) {
        return this.objectFactory.init(this.defaultConfig, config);
    }
}
