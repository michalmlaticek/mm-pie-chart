import { Component, Input, Output, OnInit, OnChanges, AfterViewInit, EventEmitter, ElementRef, SimpleChanges } from '@angular/core';
import { EAggregation, ENest, EColType, IColumn, IBaseWidget, DataFormater, ITooltipConfig } from 'mm-dashboard-core';
import { IPieChartConfig } from '../../interfaces';

import * as D3Scale from 'd3-scale';
import * as D3Path from 'd3-path';
import * as D3Select from 'd3-selection';
import * as D3Shape from 'd3-shape';
import * as D3Array from 'd3-array';
import * as D3Collection from 'd3-collection';
import * as D3Axis from 'd3-axis';
import * as D3Transition from 'd3-transition';
import * as D3Time from 'd3-time';
import * as D3TimeFormat from 'd3-time-format';


@Component({
    selector: 'mm-pie-chart',
    template: `
        <article class="mm-pie-chart-container">
            <h2>{{config.title}}</h2>
            <svg></svg>
        </article>
    `,
    styles: [
        `
        .mm-pie-chart-container {
            width: 100%;    
            height: 100%;
            display: flex;
            flex-flow: column;
        }

        .mm-pie-chart-container svg {
            width: 100%;
            flex: 1;
        }

        `
    ]
})
export class PieChartComponent implements IBaseWidget, OnInit, OnChanges, AfterViewInit {

    @Input() resized: boolean = false;
    @Input() config: IPieChartConfig;
    @Input() data: Array<any>;
    @Output() dataChange: EventEmitter<any[]> = new EventEmitter();
    @Output() tooltipOn: EventEmitter<ITooltipConfig> = new EventEmitter();
    @Output() tooltipOff: EventEmitter<ITooltipConfig> = new EventEmitter();

    htmlElem: HTMLElement;
    barData: Array<any>; // formated data
    d3Svg: any;
    viewInit: boolean;

    constructor(
        private dataFormater: DataFormater,
        private element: ElementRef
    ) {
        console.log("PieChartComponent -> contructor: ", dataFormater, element);
        this.htmlElem = element.nativeElement;
        this.viewInit = false;
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        console.log("PieChartComponent -> ngAfterViewInit");
        this.viewInit = true;
        this.d3Svg = D3Select.select(this.htmlElem).select('svg');
        console.log("PieChartComponent -> ngAfterViewInit -> d3Svg: ", this.d3Svg);
        if (this.config.groupByCol && this.config.groupValueCol && this.data) {
            this.formatData();
            this.draw();
        } else {
            console.log("PieChartComponent -> missing one of: [groupByCol, groupValueCol, data] - ", this.config.groupByCol, this.config.groupValueCol, this.data);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log("PieChartComponent -> ngOnChanges:", changes, this.viewInit);
        if (changes && this.viewInit && this.data && this.config && this.config.groupByCol && this.config.groupValueCol) {
            if (changes["data"]
                || (changes["config"]
                    && (changes["config"].currentValue["groupByCol"] != changes["config"].previousValue["groupByCol"]
                        || changes["config"].currentValue["groupValueCol"] != changes["config"].previousValue["groupValueCol"]
                        || changes["config"].currentValue["aggregation"] != changes["config"].previousValue["aggregation"]))) {
                console.log("PieChartComponent -> ngOnChanges -> reformating data");
                this.formatData();
            }

            console.log("PieChartComponent -> ngOnChanges -> redrawing");
            this.resized = false;
            this.draw();
        }
    }

    formatData() {
        this.barData = this.dataFormater.d3aggregateNumber(
            this.data,
            [this.config.groupByCol],
            this.config.groupValueCol,
            this.config.aggregation,
            ENest.entries);
    }

    onDblclick(col: IColumn, value: any) {
        console.log("PieChartComponent -> doubleclicked");
        let filteredData = this.data.filter(r => r[col.name] == value);
        console.log("PieChartComponent -> filtered data: ", filteredData);
        this.dataChange.emit(filteredData);
    }

    draw() {
        let data = this.barData;
        let config = this.config;
        let fullWidth = this.htmlElem.children[0].children[1].clientWidth;
        let fullHeight = this.htmlElem.children[0].children[1].clientHeight;
        let width = fullWidth - config.margin.left - config.margin.right;
        let height = fullHeight - config.margin.top - config.margin.bottom;
        let radius = Math.min(width, height) / 2;
        let xScale = D3Scale.scaleBand().rangeRound([0, width]).padding(0.1).domain(data.map(d => d.key));
        let yScale = D3Scale.scaleLinear().rangeRound([height, 0]).domain([0, D3Array.max(data, d => d.value)]);
        console.log("Color scale domain: ", this.barData.map(d => d.key));
        console.log("Range [colors]: ", this.config.colors);
        let colorScale = D3Scale.scaleOrdinal().range(this.config.colors); // list of color strings

        // Clear old drawing
        console.log("PieChartComponent -> draw -> clearing old elements: ", this.d3Svg);
        this.d3Svg.selectAll("g").remove();

        let d3TopG = this.d3Svg.append('g').attr('transform', 'translate(' + fullWidth / 2 + ',' + fullHeight / 2 + ')');

        let pie = D3Shape.pie()
            .sort(null)
            .value(d => d["value"]);

        let path = D3Shape.arc()
            .outerRadius(radius)
            .innerRadius(0);

        let arcs = d3TopG.selectAll(".pie-piece")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "pie-piece");



        arcs.append("path")
            .attr("d", path)
            .attr("fill", (d) => {
                console.log("PieChartComponent -> scaling data: ", d.data.key);
                let scaledColor = colorScale(d.data.key);
                console.log("PieChartComponent -> scaled color: ", scaledColor);
                return scaledColor;
            })
            .on("dblclick", d => this.onDblclick(this.config.groupByCol, d.data.key))
            .on("mouseover", d => {
                this.tooltipOn.emit({
                    event: D3Select.event,
                    values: [
                        { key: d.data.key, value: d.data.value }
                    ]
                })
            })
            .on("mouseout", d => {
                this.tooltipOff.emit({
                    event: D3Select.event,
                    values: []
                })
            });
    }


}