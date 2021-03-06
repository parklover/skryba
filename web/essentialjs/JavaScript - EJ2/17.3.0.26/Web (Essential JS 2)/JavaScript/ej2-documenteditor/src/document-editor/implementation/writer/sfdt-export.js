import { WParagraphFormat } from '../format/paragraph-format';
import { WCharacterFormat } from '../format/index';
import { LineWidget, ParagraphWidget, BodyWidget, TextElementBox, FieldElementBox, TableRowWidget, TableCellWidget, ImageElementBox, ListTextElementBox, BookmarkElementBox, EditRangeStartElementBox, EditRangeEndElementBox, ChartElementBox } from '../viewer/page';
import { BlockWidget } from '../viewer/page';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { HelperMethods } from '../editor/editor-helper';
import { StreamWriter } from '@syncfusion/ej2-file-utils';
/**
 * Exports the document to Sfdt format.
 */
var SfdtExport = /** @class */ (function () {
    /**
     * @private
     */
    function SfdtExport(owner) {
        /* tslint:disable:no-any */
        this.endLine = undefined;
        this.endOffset = undefined;
        this.endCell = undefined;
        this.startColumnIndex = undefined;
        this.endColumnIndex = undefined;
        this.lists = undefined;
        this.viewer = undefined;
        this.document = undefined;
        this.writeInlineStyles = undefined;
        this.editRangeId = -1;
        this.viewer = owner;
    }
    SfdtExport.prototype.getModuleName = function () {
        return 'SfdtExport';
    };
    SfdtExport.prototype.clear = function () {
        this.writeInlineStyles = undefined;
        this.endLine = undefined;
        this.lists = undefined;
        this.document = undefined;
        this.endCell = undefined;
    };
    /**
     * Serialize the data as Syncfusion document text.
     * @private
     */
    SfdtExport.prototype.serialize = function () {
        return JSON.stringify(this.write());
    };
    /**
     * @private
     */
    SfdtExport.prototype.saveAsBlob = function (viewer) {
        var streamWriter = new StreamWriter();
        streamWriter.write(this.serialize());
        var blob = streamWriter.buffer;
        streamWriter.destroy();
        var promise;
        return new Promise(function (resolve, reject) {
            resolve(blob);
        });
    };
    SfdtExport.prototype.updateEditRangeId = function () {
        var index = -1;
        for (var i = 0; i < this.viewer.editRanges.keys.length; i++) {
            var keys = this.viewer.editRanges.keys;
            for (var j = 0; j < keys[i].length; j++) {
                var editRangeStart = this.viewer.editRanges.get(keys[i]);
                for (var z = 0; z < editRangeStart.length; z++) {
                    index++;
                    editRangeStart[z].editRangeId = index;
                    editRangeStart[z].editRangeEnd.editRangeId = index;
                }
            }
        }
    };
    // tslint:disable-next-line:max-line-length
    /**
     * @private
     */
    SfdtExport.prototype.write = function (line, startOffset, endLine, endOffset, writeInlineStyles) {
        if (writeInlineStyles) {
            this.writeInlineStyles = true;
        }
        this.Initialize();
        this.updateEditRangeId();
        if (line instanceof LineWidget && endLine instanceof LineWidget) {
            // For selection
            var startPara = line.paragraph;
            var endPara = endLine.paragraph;
            var startCell = startPara.associatedCell;
            var endCell = endPara.associatedCell;
            // Creates section
            var bodyWidget = startPara.bodyWidget;
            var section = this.createSection(line.paragraph.bodyWidget);
            this.document.sections.push(section);
            if (startCell === endCell || isNullOrUndefined(endCell)) {
                this.endLine = endLine;
                this.endOffset = endOffset;
            }
            else {
                // Todo: Handle nested table cases
                if (startCell instanceof TableCellWidget) {
                    var startTable = startCell.getContainerTable();
                    var endTable = endCell.getContainerTable();
                    if (startTable.tableFormat === endTable.tableFormat) {
                        this.endCell = endCell;
                        if (this.endCell.ownerTable !== startCell.ownerTable && startCell.ownerTable.associatedCell
                            && startCell.ownerTable.associatedCell.ownerTable === this.endCell.ownerTable &&
                            (startCell.ownerTable.associatedCell.childWidgets.indexOf(startCell.ownerTable) === 0)) {
                            startCell = startCell.ownerTable.associatedCell;
                        }
                        this.endColumnIndex = this.endCell.columnIndex + this.endCell.cellFormat.columnSpan;
                        this.startColumnIndex = startCell.columnIndex;
                    }
                }
                else {
                    this.endCell = endCell;
                }
            }
            var nextBlock = void 0;
            if (startCell === endCell || isNullOrUndefined(startCell)) {
                var paragraph = this.createParagraph(line.paragraph);
                section.blocks.push(paragraph);
                nextBlock = this.writeParagraph(line.paragraph, paragraph, section.blocks, line.indexInOwner, startOffset);
                while (nextBlock) {
                    nextBlock = this.writeBlock(nextBlock, 0, section.blocks);
                }
                // Todo:continue in next section
            }
            else {
                // Specially handled for nested table cases
                // selection start inside table and end in paragraph outside table
                if (isNullOrUndefined(endCell) && startCell.ownerTable.associatedCell) {
                    var startTable = startCell.getContainerTable();
                    var lastRow = startTable.childWidgets[startTable.childWidgets.length - 1];
                    var endCell_1 = lastRow.childWidgets[lastRow.childWidgets.length - 1];
                    if (endCell_1.ownerTable !== startCell.ownerTable && startCell.ownerTable.associatedCell
                        && (startCell.ownerTable.associatedCell.childWidgets.indexOf(startCell.ownerTable) === 0)) {
                        while (startCell.ownerTable !== endCell_1.ownerTable) {
                            startCell = startCell.ownerTable.associatedCell;
                        }
                    }
                    this.endColumnIndex = endCell_1.columnIndex + endCell_1.cellFormat.columnSpan;
                    this.startColumnIndex = startCell.columnIndex;
                }
                var table = this.createTable(startCell.ownerTable);
                section.blocks.push(table);
                nextBlock = this.writeTable(startCell.ownerTable, table, startCell.ownerRow.indexInOwner, section.blocks);
                while (nextBlock) {
                    nextBlock = this.writeBlock(nextBlock, 0, section.blocks);
                }
            }
        }
        else {
            if (this.viewer.pages.length > 0) {
                var page = this.viewer.pages[0];
                this.writePage(page);
            }
        }
        this.writeStyles(this.viewer);
        this.writeLists(this.viewer);
        var doc = this.document;
        this.clear();
        return doc;
    };
    /**
     * @private
     */
    SfdtExport.prototype.Initialize = function () {
        this.lists = [];
        this.document = {};
        this.document.sections = [];
        this.document.characterFormat = this.writeCharacterFormat(this.viewer.characterFormat);
        this.document.paragraphFormat = this.writeParagraphFormat(this.viewer.paragraphFormat);
        this.document.defaultTabWidth = this.viewer.defaultTabWidth;
        this.document.enforcement = this.viewer.isDocumentProtected;
        this.document.hashValue = this.viewer.hashValue;
        this.document.saltValue = this.viewer.saltValue;
        this.document.formatting = this.viewer.restrictFormatting;
        this.document.protectionType = this.viewer.protectionType;
    };
    /**
     * @private
     */
    SfdtExport.prototype.writePage = function (page) {
        if (page.bodyWidgets.length > 0) {
            var nextBlock = page.bodyWidgets[0];
            do {
                nextBlock = this.writeBodyWidget(nextBlock, 0);
            } while (!isNullOrUndefined(nextBlock));
        }
        return this.document;
    };
    SfdtExport.prototype.writeBodyWidget = function (bodyWidget, index) {
        if (!(bodyWidget instanceof BodyWidget)) {
            return undefined;
        }
        var section = this.createSection(bodyWidget);
        this.document.sections.push(section);
        this.writeHeaderFooters(this.viewer.headersFooters[bodyWidget.index], section);
        var firstBlock = bodyWidget.childWidgets[index];
        do {
            firstBlock = this.writeBlock(firstBlock, 0, section.blocks);
        } while (firstBlock);
        var next = bodyWidget;
        do {
            bodyWidget = next;
            next = next.nextRenderedWidget;
        } while (next instanceof BodyWidget && next.index === bodyWidget.index);
        return next;
    };
    SfdtExport.prototype.writeHeaderFooters = function (hfs, section) {
        if (isNullOrUndefined(hfs)) {
            return;
        }
        section.headersFooters.header = this.writeHeaderFooter(hfs[0]);
        section.headersFooters.footer = this.writeHeaderFooter(hfs[1]);
        section.headersFooters.evenHeader = this.writeHeaderFooter(hfs[2]);
        section.headersFooters.evenFooter = this.writeHeaderFooter(hfs[3]);
        section.headersFooters.firstPageHeader = this.writeHeaderFooter(hfs[4]);
        section.headersFooters.firstPageFooter = this.writeHeaderFooter(hfs[5]);
    };
    SfdtExport.prototype.writeHeaderFooter = function (widget) {
        if (isNullOrUndefined(widget) || widget.isEmpty) {
            return undefined;
        }
        var headerFooter = {};
        if (widget && widget.childWidgets && widget.childWidgets.length > 0) {
            headerFooter.blocks = [];
            var firstBlock = widget.firstChild;
            do {
                firstBlock = this.writeBlock(firstBlock, 0, headerFooter.blocks);
            } while (firstBlock);
        }
        return headerFooter;
    };
    SfdtExport.prototype.createSection = function (bodyWidget) {
        var section = {};
        section.sectionFormat = {};
        section.sectionFormat.pageWidth = bodyWidget.sectionFormat.pageWidth;
        section.sectionFormat.pageHeight = bodyWidget.sectionFormat.pageHeight;
        section.sectionFormat.leftMargin = bodyWidget.sectionFormat.leftMargin;
        section.sectionFormat.rightMargin = bodyWidget.sectionFormat.rightMargin;
        section.sectionFormat.topMargin = bodyWidget.sectionFormat.topMargin;
        section.sectionFormat.bottomMargin = bodyWidget.sectionFormat.bottomMargin;
        section.sectionFormat.differentFirstPage = bodyWidget.sectionFormat.differentFirstPage;
        section.sectionFormat.differentOddAndEvenPages = bodyWidget.sectionFormat.differentOddAndEvenPages;
        section.sectionFormat.headerDistance = bodyWidget.sectionFormat.headerDistance;
        section.sectionFormat.footerDistance = bodyWidget.sectionFormat.footerDistance;
        section.sectionFormat.bidi = bodyWidget.sectionFormat.bidi;
        section.blocks = [];
        section.headersFooters = {};
        return section;
    };
    SfdtExport.prototype.writeBlock = function (widget, index, blocks) {
        if (!(widget instanceof BlockWidget)) {
            return undefined;
        }
        if (widget instanceof ParagraphWidget) {
            var paragraph = this.createParagraph(widget);
            blocks.push(paragraph);
            return this.writeParagraph(widget, paragraph, blocks);
        }
        else {
            var tableWidget = widget;
            var table = this.createTable(tableWidget);
            blocks.push(table);
            return this.writeTable(tableWidget, table, 0, blocks);
        }
    };
    SfdtExport.prototype.writeParagraph = function (paragraphWidget, paragraph, blocks, lineIndex, start) {
        if (isNullOrUndefined(lineIndex)) {
            lineIndex = 0;
        }
        if (isNullOrUndefined(start)) {
            start = 0;
        }
        var next = paragraphWidget;
        while (next instanceof ParagraphWidget) {
            if (this.writeLines(next, lineIndex, start, paragraph.inlines)) {
                return undefined;
            }
            lineIndex = 0;
            start = 0;
            paragraphWidget = next;
            next = paragraphWidget.nextSplitWidget;
        }
        next = paragraphWidget.nextRenderedWidget;
        return (next instanceof BlockWidget && paragraphWidget.containerWidget.index === next.containerWidget.index) ? next : undefined;
    };
    SfdtExport.prototype.writeInlines = function (paragraph, line, inlines) {
        var lineWidget = line.clone();
        var bidi = paragraph.paragraphFormat.bidi;
        if (bidi || this.viewer.layout.isContainsRtl(lineWidget)) {
            this.viewer.layout.reArrangeElementsForRtl(lineWidget, bidi);
        }
        for (var i = 0; i < lineWidget.children.length; i++) {
            var element = lineWidget.children[i];
            if (element instanceof ListTextElementBox) {
                continue;
            }
            var inline = this.writeInline(element);
            if (!isNullOrUndefined(inline)) {
                inlines.push(inline);
            }
        }
    };
    SfdtExport.prototype.writeInline = function (element) {
        var inline = {};
        inline.characterFormat = this.writeCharacterFormat(element.characterFormat);
        if (element instanceof FieldElementBox) {
            inline.fieldType = element.fieldType;
            if (element.fieldType === 0) {
                inline.hasFieldEnd = true;
            }
            if (element.fieldCodeType && element.fieldCodeType !== '') {
                inline.fieldCodeType = element.fieldCodeType;
            }
        }
        else if (element instanceof ChartElementBox) {
            this.writeChart(element, inline);
        }
        else if (element instanceof ImageElementBox) {
            inline.imageString = element.imageString;
            inline.width = HelperMethods.convertPixelToPoint(element.width);
            inline.height = HelperMethods.convertPixelToPoint(element.height);
        }
        else if (element instanceof BookmarkElementBox) {
            inline.bookmarkType = element.bookmarkType;
            inline.name = element.name;
        }
        else if (element instanceof TextElementBox) {
            // replacing the no break hyphen character by '-'
            if (element.text.indexOf('\u001e') !== -1) {
                inline.text = element.text.replace('\u001e', '-');
            }
            else if (element.text.indexOf('\u001f') !== -1) {
                inline.text = element.text.replace('\u001f', '');
            }
            else {
                inline.text = element.text;
            }
        }
        else if (element instanceof EditRangeStartElementBox) {
            inline.user = element.user;
            inline.group = element.group;
            inline.columnFirst = element.columnFirst;
            inline.columnLast = element.columnLast;
            inline.editRangeId = element.editRangeId.toString();
        }
        else if (element instanceof EditRangeEndElementBox) {
            inline.editableRangeStart = {
                'user': element.editRangeStart.user,
                'group': element.editRangeStart.group,
                'columnFirst': element.editRangeStart.columnFirst,
                'columnLast': element.editRangeStart.columnLast
            };
            inline.editRangeId = element.editRangeId.toString();
        }
        else {
            inline = undefined;
        }
        return inline;
    };
    SfdtExport.prototype.writeChart = function (element, inline) {
        inline.chartLegend = {};
        inline.chartTitleArea = {};
        inline.chartArea = {};
        inline.plotArea = {};
        inline.chartCategory = [];
        inline.chartSeries = [];
        inline.chartPrimaryCategoryAxis = {};
        inline.chartPrimaryValueAxis = {};
        this.writeChartTitleArea(element.chartTitleArea, inline.chartTitleArea);
        this.writeChartArea(element.chartArea, inline.chartArea);
        this.writeChartArea(element.chartPlotArea, inline.plotArea);
        this.writeChartCategory(element, inline.chartCategory);
        this.createChartSeries(element, inline.chartSeries);
        this.writeChartLegend(element.chartLegend, inline.chartLegend);
        this.writeChartCategoryAxis(element.chartPrimaryCategoryAxis, inline.chartPrimaryCategoryAxis);
        this.writeChartCategoryAxis(element.chartPrimaryValueAxis, inline.chartPrimaryValueAxis);
        if (element.chartDataTable.showSeriesKeys !== undefined) {
            inline.chartDataTable = {};
            this.writeChartDataTable(element.chartDataTable, inline.chartDataTable);
        }
        inline.chartTitle = element.title;
        inline.chartType = element.type;
        inline.gapWidth = element.chartGapWidth;
        inline.overlap = element.chartOverlap;
        inline.height = HelperMethods.convertPixelToPoint(element.height);
        inline.width = HelperMethods.convertPixelToPoint(element.width);
    };
    SfdtExport.prototype.writeChartTitleArea = function (titleArea, chartTitleArea) {
        chartTitleArea.fontName = titleArea.chartfontName;
        chartTitleArea.fontSize = titleArea.chartFontSize;
        chartTitleArea.layout = {};
        chartTitleArea.dataFormat = this.writeChartDataFormat(titleArea.dataFormat);
        this.writeChartLayout(titleArea.layout, chartTitleArea.layout);
    };
    SfdtExport.prototype.writeChartDataFormat = function (format) {
        var chartDataFormat = {};
        chartDataFormat.fill = {};
        chartDataFormat.line = {};
        chartDataFormat.fill.foreColor = format.fill.color;
        chartDataFormat.fill.rgb = format.fill.rgb;
        chartDataFormat.line.color = format.line.color;
        chartDataFormat.line.rgb = format.line.rgb;
        return chartDataFormat;
    };
    SfdtExport.prototype.writeChartLayout = function (layout, chartLayout) {
        chartLayout.layoutX = layout.chartLayoutLeft;
        chartLayout.layoutY = layout.chartLayoutTop;
    };
    SfdtExport.prototype.writeChartArea = function (area, chartArea) {
        chartArea.foreColor = area.chartForeColor;
    };
    SfdtExport.prototype.writeChartLegend = function (legend, chartLegend) {
        chartLegend.position = legend.chartLegendPostion;
        chartLegend.chartTitleArea = {};
        this.writeChartTitleArea(legend.chartTitleArea, chartLegend.chartTitleArea);
    };
    SfdtExport.prototype.writeChartCategoryAxis = function (categoryAxis, primaryCategoryAxis) {
        primaryCategoryAxis.chartTitle = categoryAxis.categoryAxisTitle;
        primaryCategoryAxis.chartTitleArea = {};
        this.writeChartTitleArea(categoryAxis.chartTitleArea, primaryCategoryAxis.chartTitleArea);
        primaryCategoryAxis.categoryType = categoryAxis.categoryAxisType;
        primaryCategoryAxis.fontSize = categoryAxis.axisFontSize;
        primaryCategoryAxis.fontName = categoryAxis.axisFontName;
        primaryCategoryAxis.numberFormat = categoryAxis.categoryNumberFormat;
        primaryCategoryAxis.maximumValue = categoryAxis.max;
        primaryCategoryAxis.minimumValue = categoryAxis.min;
        primaryCategoryAxis.majorUnit = categoryAxis.interval;
        primaryCategoryAxis.hasMajorGridLines = categoryAxis.majorGridLines;
        primaryCategoryAxis.hasMinorGridLines = categoryAxis.minorGridLines;
        primaryCategoryAxis.majorTickMark = categoryAxis.majorTick;
        primaryCategoryAxis.minorTickMark = categoryAxis.minorTick;
        primaryCategoryAxis.tickLabelPosition = categoryAxis.tickPosition;
    };
    SfdtExport.prototype.writeChartDataTable = function (chartDataTable, dataTable) {
        dataTable.showSeriesKeys = chartDataTable.showSeriesKeys;
        dataTable.hasHorzBorder = chartDataTable.hasHorzBorder;
        dataTable.hasVertBorder = chartDataTable.hasVertBorder;
        dataTable.hasBorders = chartDataTable.hasBorders;
    };
    SfdtExport.prototype.writeChartCategory = function (element, chartCategory) {
        var data = element.chartCategory;
        chartCategory.chartData = [];
        for (var i = 0; i < data.length; i++) {
            var xData = data[i];
            var categories = this.createChartCategory(xData, element.chartType);
            chartCategory.push(categories);
        }
    };
    SfdtExport.prototype.createChartCategory = function (data, type) {
        var chartCategory = {};
        chartCategory.chartData = [];
        this.writeChartData(data, chartCategory.chartData, type);
        chartCategory.categoryXName = data.categoryXName;
        return chartCategory;
    };
    SfdtExport.prototype.writeChartData = function (element, chartData, type) {
        var data = element.chartData;
        for (var i = 0; i < data.length; i++) {
            var yData = data[i];
            var yCategory = this.createChartData(yData, type);
            chartData.push(yCategory);
        }
    };
    SfdtExport.prototype.createChartData = function (data, type) {
        var chartData = {};
        chartData.yValue = data.yValue;
        if (type === 'Bubble') {
            chartData.size = data.size;
        }
        return chartData;
    };
    SfdtExport.prototype.createChartSeries = function (element, chartSeries) {
        var data = element.chartSeries;
        var type = element.chartType;
        for (var i = 0; i < data.length; i++) {
            var yData = data[i];
            var series = this.writeChartSeries(yData, type);
            chartSeries.push(series);
        }
    };
    SfdtExport.prototype.writeChartSeries = function (series, type) {
        var isPieType = (type === 'Pie' || type === 'Doughnut');
        var chartSeries = {};
        var errorBar = {};
        var errorBarData = series.errorBar;
        chartSeries.dataPoints = [];
        chartSeries.seriesName = series.seriesName;
        if (isPieType) {
            if (!isNullOrUndefined(series.firstSliceAngle)) {
                chartSeries.firstSliceAngle = series.firstSliceAngle;
            }
            if (type === 'Doughnut') {
                chartSeries.holeSize = series.doughnutHoleSize;
            }
        }
        if (!isNullOrUndefined(series.dataLabels.labelPosition)) {
            var dataLabel = this.writeChartDataLabels(series.dataLabels);
            chartSeries.dataLabel = dataLabel;
        }
        if (!isNullOrUndefined(series.seriesFormat.markerStyle)) {
            var seriesFormat = {};
            var format = series.seriesFormat;
            seriesFormat.markerStyle = format.markerStyle;
            seriesFormat.markerSize = format.numberValue;
            seriesFormat.markerColor = format.markerColor;
            chartSeries.seriesFormat = seriesFormat;
        }
        if (!isNullOrUndefined(errorBarData.type)) {
            errorBar.type = errorBarData.type;
            errorBar.direction = errorBarData.direction;
            errorBar.endStyle = errorBarData.endStyle;
            errorBar.numberValue = errorBarData.numberValue;
            chartSeries.errorBar = errorBarData;
        }
        if (series.trendLines.length > 0) {
            chartSeries.trendLines = [];
            for (var i = 0; i < series.trendLines.length; i++) {
                var trendLine = this.writeChartTrendLines(series.trendLines[i]);
                chartSeries.trendLines.push(trendLine);
            }
        }
        for (var i = 0; i < series.chartDataFormat.length; i++) {
            var format = this.writeChartDataFormat(series.chartDataFormat[i]);
            chartSeries.dataPoints.push(format);
        }
        return chartSeries;
    };
    SfdtExport.prototype.writeChartDataLabels = function (dataLabels) {
        var dataLabel = {};
        dataLabel.position = dataLabels.position;
        dataLabel.fontName = dataLabels.fontName;
        dataLabel.fontColor = dataLabels.fontColor;
        dataLabel.fontSize = dataLabels.fontSize;
        dataLabel.isLegendKey = dataLabels.isLegendKey;
        dataLabel.isBubbleSize = dataLabels.isBubbleSize;
        dataLabel.isCategoryName = dataLabels.isCategoryName;
        dataLabel.isSeriesName = dataLabels.isSeriesName;
        dataLabel.isValue = dataLabels.isValue;
        dataLabel.isPercentage = dataLabels.isPercentage;
        dataLabel.isLeaderLines = dataLabels.isLeaderLines;
        return dataLabel;
    };
    SfdtExport.prototype.writeChartTrendLines = function (trendLines) {
        var trendLine = {};
        trendLine.name = trendLines.trendLineName;
        trendLine.type = trendLines.trendLineType;
        trendLine.forward = trendLines.forwardValue;
        trendLine.backward = trendLines.backwardValue;
        trendLine.intercept = trendLines.interceptValue;
        trendLine.isDisplayEquation = trendLines.isDisplayEquation;
        trendLine.isDisplayRSquared = trendLines.isDisplayRSquared;
        return trendLine;
    };
    SfdtExport.prototype.writeLines = function (paragraph, lineIndex, offset, inlines) {
        var startIndex = lineIndex;
        var endParagraph = this.endLine instanceof LineWidget && this.endLine.paragraph === paragraph;
        var endIndex = endParagraph ? this.endLine.indexInOwner : paragraph.childWidgets.length - 1;
        for (var i = startIndex; i <= endIndex; i++) {
            var child = paragraph.childWidgets[i];
            if (this.endLine === child || (lineIndex === i && offset !== 0)) {
                this.writeLine(child, offset, inlines);
            }
            else {
                this.writeInlines(paragraph, child, inlines);
            }
        }
        return endParagraph;
    };
    SfdtExport.prototype.writeLine = function (line, offset, inlines) {
        var isEnd = line === this.endLine;
        var lineWidget = line.clone();
        var bidi = line.paragraph.paragraphFormat.bidi;
        if (bidi || this.viewer.layout.isContainsRtl(lineWidget)) {
            this.viewer.layout.reArrangeElementsForRtl(lineWidget, bidi);
        }
        var started = false;
        var ended = false;
        var length = 0;
        for (var j = 0; j < lineWidget.children.length; j++) {
            var element = lineWidget.children[j];
            if (element instanceof ListTextElementBox) {
                continue;
            }
            var inline = undefined;
            length += element.length;
            started = length > offset;
            ended = isEnd && length >= this.endOffset;
            if (!started) {
                continue;
            }
            inline = this.writeInline(element);
            inlines[inlines.length] = inline;
            if (length > offset || ended) {
                if (inline.hasOwnProperty('text')) {
                    var startIndex = length - element.length;
                    var indexInInline = offset - startIndex;
                    var endIndex = ended ? this.endOffset - startIndex : element.length;
                    inline.text = inline.text.substring(indexInInline, endIndex);
                }
                offset = -1;
            }
            if (ended) {
                break;
            }
        }
    };
    SfdtExport.prototype.createParagraph = function (paragraphWidget) {
        var paragraph = {};
        var isParaSelected = false;
        if (this.viewer.selection && !this.viewer.selection.isEmpty) {
            var endPos = this.viewer.selection.end;
            if (!this.viewer.selection.isForward) {
                endPos = this.viewer.selection.start;
            }
            var lastLine = endPos.paragraph.childWidgets[endPos.paragraph.childWidgets.length - 1];
            isParaSelected = this.viewer.selection.isParagraphLastLine(lastLine) && endPos.currentWidget === lastLine
                && endPos.offset === this.viewer.selection.getLineLength(lastLine) + 1;
        }
        else {
            isParaSelected = true;
        }
        // tslint:disable-next-line:max-line-length
        paragraph.paragraphFormat = this.writeParagraphFormat(isParaSelected ? paragraphWidget.paragraphFormat : new WParagraphFormat(paragraphWidget));
        paragraph.characterFormat = this.writeCharacterFormat(isParaSelected ? paragraphWidget.characterFormat : new WCharacterFormat(paragraphWidget));
        paragraph.inlines = [];
        return paragraph;
    };
    /**
     * @private
     */
    SfdtExport.prototype.writeCharacterFormat = function (format, isInline) {
        var characterFormat = {};
        HelperMethods.writeCharacterFormat(characterFormat, isInline, format);
        if (this.writeInlineStyles && !isInline) {
            characterFormat.inlineFormat = this.writeCharacterFormat(format, true);
        }
        return characterFormat;
    };
    SfdtExport.prototype.writeParagraphFormat = function (format, isInline) {
        var paragraphFormat = {};
        paragraphFormat.leftIndent = isInline ? format.leftIndent : format.getValue('leftIndent');
        paragraphFormat.rightIndent = isInline ? format.rightIndent : format.getValue('rightIndent');
        paragraphFormat.firstLineIndent = isInline ? format.firstLineIndent : format.getValue('firstLineIndent');
        paragraphFormat.textAlignment = isInline ? format.textAlignment : format.getValue('textAlignment');
        paragraphFormat.beforeSpacing = isInline ? format.beforeSpacing : format.getValue('beforeSpacing');
        paragraphFormat.afterSpacing = isInline ? format.afterSpacing : format.getValue('afterSpacing');
        paragraphFormat.lineSpacing = isInline ? format.lineSpacing : format.getValue('lineSpacing');
        paragraphFormat.lineSpacingType = isInline ? format.lineSpacingType : format.getValue('lineSpacingType');
        paragraphFormat.styleName = !isNullOrUndefined(format.baseStyle) ? format.baseStyle.name : undefined;
        paragraphFormat.outlineLevel = isInline ? format.outlineLevel : format.getValue('outlineLevel');
        paragraphFormat.listFormat = this.writeListFormat(format.listFormat, isInline);
        paragraphFormat.tabs = this.writeTabs(format.tabs);
        paragraphFormat.bidi = isInline ? format.bidi : format.getValue('bidi');
        paragraphFormat.contextualSpacing = isInline ? format.contextualSpacing : format.getValue('contextualSpacing');
        if (this.writeInlineStyles && !isInline) {
            paragraphFormat.inlineFormat = this.writeParagraphFormat(format, true);
        }
        return paragraphFormat;
    };
    SfdtExport.prototype.writeTabs = function (tabStops) {
        if (isNullOrUndefined(tabStops) || tabStops.length < 1) {
            return undefined;
        }
        var tabs = [];
        for (var i = 0; i < tabStops.length; i++) {
            var tabStop = tabStops[i];
            var tab = {};
            tab.position = tabStop.position;
            tab.deletePosition = tabStop.deletePosition;
            tab.tabJustification = tabStop.tabJustification;
            tab.tabLeader = tabStop.tabLeader;
            tabs.push(tab);
        }
        return tabs;
    };
    /**
     * @private
     */
    SfdtExport.prototype.writeListFormat = function (format, isInline) {
        var listFormat = {};
        var listIdValue = format.getValue('listId');
        if (!isNullOrUndefined(listIdValue)) {
            listFormat.listId = listIdValue;
            var listLevelNumber = format.getValue('listLevelNumber');
            if (!isNullOrUndefined(listLevelNumber)) {
                listFormat.listLevelNumber = listLevelNumber;
            }
            if (this.lists.indexOf(format.listId) < 0) {
                this.lists.push(format.listId);
            }
        }
        return listFormat;
    };
    SfdtExport.prototype.writeTable = function (tableWidget, table, index, blocks) {
        var widget = tableWidget.childWidgets[index];
        if (widget instanceof TableRowWidget) {
            if (this.writeRow(widget, table.rows)) {
                return undefined;
            }
        }
        var next = tableWidget;
        do {
            tableWidget = next;
            next = tableWidget.nextSplitWidget;
        } while (next instanceof BlockWidget);
        next = tableWidget.nextRenderedWidget;
        return (next instanceof BlockWidget && next.containerWidget.index === tableWidget.containerWidget.index) ? next : undefined;
    };
    SfdtExport.prototype.writeRow = function (rowWidget, rows) {
        if (!(rowWidget instanceof TableRowWidget)) {
            return false;
        }
        var row = this.createRow(rowWidget);
        rows.push(row);
        for (var i = 0; i < rowWidget.childWidgets.length; i++) {
            var widget = rowWidget.childWidgets[i];
            if (widget instanceof TableCellWidget) {
                if (rowWidget.index === widget.rowIndex
                    && (isNullOrUndefined(this.startColumnIndex) || widget.columnIndex >= this.startColumnIndex)
                    && (isNullOrUndefined(this.endColumnIndex) || widget.columnIndex < this.endColumnIndex)) {
                    if (this.writeCell(widget, row.cells)) {
                        return true;
                    }
                }
            }
        }
        var next = rowWidget;
        do {
            rowWidget = next;
            next = rowWidget.nextRenderedWidget;
            if (next && rowWidget.ownerTable.index !== next.ownerTable.index) {
                next = undefined;
            }
        } while (next instanceof TableRowWidget && next.index === rowWidget.index);
        return this.writeRow(next, rows);
    };
    SfdtExport.prototype.writeCell = function (cellWidget, cells) {
        var cell = this.createCell(cellWidget);
        cells.push(cell);
        var firstBlock = cellWidget.firstChild;
        do {
            firstBlock = this.writeBlock(firstBlock, 0, cell.blocks);
        } while (firstBlock);
        return this.endCell instanceof TableCellWidget ? this.endCell.cellFormat === cellWidget.cellFormat : false;
    };
    SfdtExport.prototype.createTable = function (tableWidget) {
        var table = {};
        table.rows = [];
        table.grid = [];
        for (var i = 0; i < tableWidget.tableHolder.columns.length; i++) {
            table.grid[i] = tableWidget.tableHolder.columns[i].preferredWidth;
        }
        table.tableFormat = this.writeTableFormat(tableWidget.tableFormat);
        table.description = tableWidget.description;
        table.title = tableWidget.title;
        return table;
    };
    SfdtExport.prototype.createRow = function (rowWidget) {
        var row = {};
        row.cells = [];
        row.rowFormat = this.writeRowFormat(rowWidget.rowFormat);
        return row;
    };
    SfdtExport.prototype.createCell = function (cellWidget) {
        var cell = {};
        cell.blocks = [];
        cell.cellFormat = this.writeCellFormat(cellWidget.cellFormat);
        cell.columnIndex = cellWidget.columnIndex;
        return cell;
    };
    SfdtExport.prototype.writeShading = function (wShading) {
        var shading = {};
        shading.backgroundColor = wShading.backgroundColor;
        shading.foregroundColor = wShading.foregroundColor;
        shading.textureStyle = wShading.textureStyle;
        return shading;
    };
    SfdtExport.prototype.writeBorder = function (wBorder) {
        var border = {};
        border.color = wBorder.color;
        border.hasNoneStyle = wBorder.hasNoneStyle;
        border.lineStyle = wBorder.lineStyle;
        border.lineWidth = wBorder.lineWidth;
        border.shadow = wBorder.shadow;
        border.space = wBorder.space;
        return border;
    };
    SfdtExport.prototype.writeBorders = function (wBorders) {
        var borders = {};
        borders.top = this.writeBorder(wBorders.top);
        borders.left = this.writeBorder(wBorders.left);
        borders.right = this.writeBorder(wBorders.right);
        borders.bottom = this.writeBorder(wBorders.bottom);
        borders.diagonalDown = this.writeBorder(wBorders.diagonalDown);
        borders.diagonalUp = this.writeBorder(wBorders.diagonalUp);
        borders.horizontal = this.writeBorder(wBorders.horizontal);
        borders.vertical = this.writeBorder(wBorders.vertical);
        return borders;
    };
    SfdtExport.prototype.writeCellFormat = function (wCellFormat) {
        var cellFormat = {};
        cellFormat.borders = this.writeBorders(wCellFormat.borders);
        cellFormat.shading = this.writeShading(wCellFormat.shading);
        cellFormat.topMargin = wCellFormat.topMargin;
        cellFormat.rightMargin = wCellFormat.rightMargin;
        cellFormat.leftMargin = wCellFormat.leftMargin;
        cellFormat.bottomMargin = wCellFormat.bottomMargin;
        cellFormat.preferredWidth = wCellFormat.preferredWidth;
        cellFormat.preferredWidthType = wCellFormat.preferredWidthType;
        cellFormat.cellWidth = wCellFormat.cellWidth;
        cellFormat.columnSpan = wCellFormat.columnSpan;
        cellFormat.rowSpan = wCellFormat.rowSpan;
        cellFormat.verticalAlignment = wCellFormat.verticalAlignment;
        return cellFormat;
    };
    SfdtExport.prototype.writeRowFormat = function (wRowFormat) {
        var rowFormat = {};
        rowFormat.height = wRowFormat.height;
        rowFormat.allowBreakAcrossPages = wRowFormat.allowBreakAcrossPages;
        rowFormat.heightType = wRowFormat.heightType;
        rowFormat.isHeader = wRowFormat.isHeader;
        rowFormat.borders = this.writeBorders(wRowFormat.borders);
        rowFormat.gridBefore = wRowFormat.gridBefore;
        rowFormat.gridBeforeWidth = wRowFormat.gridBeforeWidth;
        rowFormat.gridBeforeWidthType = wRowFormat.gridBeforeWidthType;
        rowFormat.gridAfter = wRowFormat.gridAfter;
        rowFormat.gridAfterWidth = wRowFormat.gridAfterWidth;
        rowFormat.gridAfterWidthType = wRowFormat.gridAfterWidthType;
        rowFormat.leftMargin = wRowFormat.leftMargin;
        rowFormat.topMargin = wRowFormat.topMargin;
        rowFormat.rightMargin = wRowFormat.rightMargin;
        rowFormat.bottomMargin = wRowFormat.bottomMargin;
        rowFormat.leftIndent = wRowFormat.leftIndent;
        return rowFormat;
    };
    SfdtExport.prototype.writeTableFormat = function (wTableFormat) {
        var tableFormat = {};
        tableFormat.borders = this.writeBorders(wTableFormat.borders);
        tableFormat.shading = this.writeShading(wTableFormat.shading);
        tableFormat.cellSpacing = wTableFormat.cellSpacing;
        tableFormat.leftIndent = wTableFormat.leftIndent;
        tableFormat.tableAlignment = wTableFormat.tableAlignment;
        tableFormat.topMargin = wTableFormat.topMargin;
        tableFormat.rightMargin = wTableFormat.rightMargin;
        tableFormat.leftMargin = wTableFormat.leftMargin;
        tableFormat.bottomMargin = wTableFormat.bottomMargin;
        tableFormat.preferredWidth = wTableFormat.preferredWidth;
        tableFormat.preferredWidthType = wTableFormat.preferredWidthType;
        tableFormat.bidi = wTableFormat.bidi;
        tableFormat.allowAutoFit = wTableFormat.allowAutoFit;
        return tableFormat;
    };
    SfdtExport.prototype.writeStyles = function (viewer) {
        var styles = [];
        this.document.styles = [];
        for (var i = 0; i < viewer.styles.length; i++) {
            this.document.styles.push(this.writeStyle(viewer.styles.getItem(i)));
        }
    };
    SfdtExport.prototype.writeStyle = function (style) {
        var wStyle = {};
        wStyle.name = style.name;
        if (style.type === 'Paragraph') {
            wStyle.type = 'Paragraph';
            wStyle.paragraphFormat = this.writeParagraphFormat(style.paragraphFormat);
            wStyle.characterFormat = this.writeCharacterFormat(style.characterFormat);
        }
        if (style.type === 'Character') {
            wStyle.type = 'Character';
            wStyle.characterFormat = this.writeCharacterFormat(style.characterFormat);
        }
        if (!isNullOrUndefined(style.basedOn)) {
            wStyle.basedOn = style.basedOn.name;
        }
        if (!isNullOrUndefined(style.link)) {
            wStyle.link = style.link.name;
        }
        if (!isNullOrUndefined(style.next)) {
            wStyle.next = style.next.name;
        }
        return wStyle;
    };
    SfdtExport.prototype.writeLists = function (viewer) {
        var abstractLists = [];
        this.document.lists = [];
        for (var i = 0; i < viewer.lists.length; i++) {
            var list = viewer.lists[i];
            if (this.lists.indexOf(list.listId) > -1) {
                this.document.lists.push(this.writeList(list));
                if (abstractLists.indexOf(list.abstractListId) < 0) {
                    abstractLists.push(list.abstractListId);
                }
            }
        }
        this.document.abstractLists = [];
        for (var i = 0; i < viewer.abstractLists.length; i++) {
            var abstractList = viewer.abstractLists[i];
            if (abstractLists.indexOf(abstractList.abstractListId) > -1) {
                this.document.abstractLists.push(this.writeAbstractList(abstractList));
            }
        }
    };
    SfdtExport.prototype.writeAbstractList = function (wAbstractList) {
        var abstractList = {};
        abstractList.abstractListId = wAbstractList.abstractListId;
        abstractList.levels = [];
        for (var i = 0; i < wAbstractList.levels.length; i++) {
            abstractList.levels[i] = this.writeListLevel(wAbstractList.levels[i]);
        }
        return abstractList;
    };
    SfdtExport.prototype.writeList = function (wList) {
        var list = {};
        list.abstractListId = wList.abstractListId;
        //list.levelOverrides = wList.levelOverrides;
        list.listId = wList.listId;
        return list;
    };
    SfdtExport.prototype.writeListLevel = function (wListLevel) {
        var listLevel = {};
        listLevel.characterFormat = this.writeCharacterFormat(wListLevel.characterFormat);
        listLevel.paragraphFormat = this.writeParagraphFormat(wListLevel.paragraphFormat);
        listLevel.followCharacter = wListLevel.followCharacter;
        listLevel.listLevelPattern = wListLevel.listLevelPattern;
        listLevel.numberFormat = wListLevel.numberFormat;
        listLevel.restartLevel = wListLevel.restartLevel;
        listLevel.startAt = wListLevel.startAt;
        return listLevel;
    };
    /**
     * @private
     */
    SfdtExport.prototype.destroy = function () {
        this.lists = undefined;
        this.endLine = undefined;
        this.endOffset = undefined;
        this.viewer = undefined;
    };
    return SfdtExport;
}());
export { SfdtExport };
