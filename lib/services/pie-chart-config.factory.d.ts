import { MmObjectFactory } from 'mm-dashboard-core';
import { IPieChartConfig } from '../interfaces';
export declare class PieChartConfigFactory {
    private objectFactory;
    defaultConfig: IPieChartConfig;
    constructor(objectFactory: MmObjectFactory<IPieChartConfig>);
    init(config?: IPieChartConfig): IPieChartConfig;
}
