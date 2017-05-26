import { EAggregation, IColumn, IBaseWidgetConfig, IMargin } from 'mm-dashboard-core';
export interface IColor {
    color: string;
}
export interface IPieChartConfig extends IBaseWidgetConfig {
    title?: string;
    margin?: IMargin;
    colors?: Array<string>;
    aggregation?: EAggregation;
    groupByCol?: IColumn;
    groupValueCol?: IColumn;
}
