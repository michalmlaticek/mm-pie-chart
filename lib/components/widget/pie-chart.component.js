var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { ENest, DataFormater } from 'mm-dashboard-core';
import * as D3Scale from 'd3-scale';
import * as D3Select from 'd3-selection';
import * as D3Shape from 'd3-shape';
import * as D3Array from 'd3-array';
var PieChartComponent = (function () {
    function PieChartComponent(dataFormater, element) {
        this.dataFormater = dataFormater;
        this.element = element;
        this.resized = false;
        this.dataChange = new EventEmitter();
        this.tooltipOn = new EventEmitter();
        this.tooltipOff = new EventEmitter();
        console.log("PieChartComponent -> contructor: ", dataFormater, element);
        this.htmlElem = element.nativeElement;
        this.viewInit = false;
    }
    PieChartComponent.prototype.ngOnInit = function () {
    };
    PieChartComponent.prototype.ngAfterViewInit = function () {
        console.log("PieChartComponent -> ngAfterViewInit");
        this.viewInit = true;
        this.d3Svg = D3Select.select(this.htmlElem).select('svg');
        console.log("PieChartComponent -> ngAfterViewInit -> d3Svg: ", this.d3Svg);
        if (this.config.groupByCol && this.config.groupValueCol && this.data) {
            this.formatData();
            this.draw();
        }
        else {
            console.log("PieChartComponent -> missing one of: [groupByCol, groupValueCol, data] - ", this.config.groupByCol, this.config.groupValueCol, this.data);
        }
    };
    PieChartComponent.prototype.ngOnChanges = function (changes) {
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
    };
    PieChartComponent.prototype.formatData = function () {
        this.barData = this.dataFormater.d3aggregateNumber(this.data, [this.config.groupByCol], this.config.groupValueCol, this.config.aggregation, ENest.entries);
    };
    PieChartComponent.prototype.onDblclick = function (col, value) {
        console.log("PieChartComponent -> doubleclicked");
        var filteredData = this.data.filter(function (r) { return r[col.name] == value; });
        console.log("PieChartComponent -> filtered data: ", filteredData);
        this.dataChange.emit(filteredData);
    };
    PieChartComponent.prototype.draw = function () {
        var _this = this;
        var data = this.barData;
        var config = this.config;
        var fullWidth = this.htmlElem.children[0].children[1].clientWidth;
        var fullHeight = this.htmlElem.children[0].children[1].clientHeight;
        var width = fullWidth - config.margin.left - config.margin.right;
        var height = fullHeight - config.margin.top - config.margin.bottom;
        var radius = Math.min(width, height) / 2;
        var xScale = D3Scale.scaleBand().rangeRound([0, width]).padding(0.1).domain(data.map(function (d) { return d.key; }));
        var yScale = D3Scale.scaleLinear().rangeRound([height, 0]).domain([0, D3Array.max(data, function (d) { return d.value; })]);
        console.log("Color scale domain: ", this.barData.map(function (d) { return d.key; }));
        console.log("Range [colors]: ", this.config.colors);
        var colorScale = D3Scale.scaleOrdinal().range(this.config.colors); // list of color strings
        // Clear old drawing
        console.log("PieChartComponent -> draw -> clearing old elements: ", this.d3Svg);
        this.d3Svg.selectAll("g").remove();
        var d3TopG = this.d3Svg.append('g').attr('transform', 'translate(' + fullWidth / 2 + ',' + fullHeight / 2 + ')');
        var pie = D3Shape.pie()
            .sort(null)
            .value(function (d) { return d["value"]; });
        var path = D3Shape.arc()
            .outerRadius(radius)
            .innerRadius(0);
        var arcs = d3TopG.selectAll(".pie-piece")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "pie-piece");
        arcs.append("path")
            .attr("d", path)
            .attr("fill", function (d) {
            console.log("PieChartComponent -> scaling data: ", d.data.key);
            var scaledColor = colorScale(d.data.key);
            console.log("PieChartComponent -> scaled color: ", scaledColor);
            return scaledColor;
        })
            .on("dblclick", function (d) { return _this.onDblclick(_this.config.groupByCol, d.data.key); })
            .on("mouseover", function (d) {
            _this.tooltipOn.emit({
                event: D3Select.event,
                values: [
                    { key: d.data.key, value: d.data.value }
                ]
            });
        })
            .on("mouseout", function (d) {
            _this.tooltipOff.emit({
                event: D3Select.event,
                values: []
            });
        });
    };
    return PieChartComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], PieChartComponent.prototype, "resized", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "config", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], PieChartComponent.prototype, "data", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], PieChartComponent.prototype, "dataChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], PieChartComponent.prototype, "tooltipOn", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], PieChartComponent.prototype, "tooltipOff", void 0);
PieChartComponent = __decorate([
    Component({
        selector: 'mm-pie-chart',
        template: "\n        <article class=\"mm-pie-chart-container\">\n            <h2>{{config.title}}</h2>\n            <svg></svg>\n        </article>\n    ",
        styles: [
            "\n        .mm-pie-chart-container {\n            width: 100%;    \n            height: 100%;\n            display: flex;\n            flex-flow: column;\n        }\n\n        .mm-pie-chart-container svg {\n            width: 100%;\n            flex: 1;\n        }\n\n        "
        ]
    }),
    __metadata("design:paramtypes", [DataFormater,
        ElementRef])
], PieChartComponent);
export { PieChartComponent };
//# sourceMappingURL=C:/_user/Code/dashboard/mm-pie-chart/src/components/widget/pie-chart.component.js.map